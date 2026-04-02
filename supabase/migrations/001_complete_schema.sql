-- ================================================================
-- PediHealth Complete Database Schema
-- ================================================================

-- ── Enums ──────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('parent', 'doctor', 'admin');
CREATE TYPE user_locale AS ENUM ('zh-TW', 'en');
CREATE TYPE child_sex AS ENUM ('male', 'female');
CREATE TYPE visit_type AS ENUM ('initial', 'follow_up', 'emergency');
CREATE TYPE visit_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE relationship_type AS ENUM ('father', 'mother', 'guardian', 'other');
CREATE TYPE doctor_child_status AS ENUM ('active', 'discharged');
CREATE TYPE injection_site AS ENUM (
  'left_arm', 'right_arm', 'left_thigh', 'right_thigh',
  'left_abdomen', 'right_abdomen', 'left_buttock', 'right_buttock'
);
CREATE TYPE lab_category AS ENUM ('hormone', 'metabolic', 'thyroid', 'lipid', 'liver', 'cbc', 'other');
CREATE TYPE lab_flag AS ENUM ('normal', 'low', 'high', 'critical_low', 'critical_high');
CREATE TYPE reminder_type AS ENUM ('injection', 'medication', 'appointment', 'lab_test');

-- ── Helper function: auto-update updated_at ───────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Profiles ──────────────────────────────────────────

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'parent',
  display_name TEXT NOT NULL,
  phone TEXT,
  locale user_locale NOT NULL DEFAULT 'zh-TW',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Doctors ───────────────────────────────────────────

CREATE TABLE doctors (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  license_number TEXT UNIQUE NOT NULL,
  specialty TEXT[] DEFAULT '{}',
  clinic_name TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Children ──────────────────────────────────────────

CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  sex child_sex NOT NULL,
  blood_type TEXT,
  avatar_url TEXT,
  diagnosis_tags TEXT[] DEFAULT '{}',
  primary_doctor_id UUID REFERENCES doctors(id),
  father_height_cm NUMERIC(5,2),
  mother_height_cm NUMERIC(5,2),
  target_height_cm NUMERIC(5,2),
  gestational_age INTEGER,
  birth_weight_kg NUMERIC(4,2),
  birth_length_cm NUMERIC(5,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Parent-Child (many-to-many) ───────────────────────

CREATE TABLE parent_child (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  relationship relationship_type NOT NULL DEFAULT 'guardian',
  UNIQUE(parent_id, child_id)
);

-- ── Doctor-Child ──────────────────────────────────────

CREATE TABLE doctor_child (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  status doctor_child_status NOT NULL DEFAULT 'active',
  since DATE DEFAULT CURRENT_DATE,
  UNIQUE(doctor_id, child_id)
);

-- ── Growth Measurements ───────────────────────────────

CREATE TABLE growth_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  measured_at DATE NOT NULL,
  height_cm NUMERIC(5,2),
  weight_kg NUMERIC(5,2),
  bmi NUMERIC(4,1),
  height_percentile NUMERIC(5,2),
  weight_percentile NUMERIC(5,2),
  bmi_percentile NUMERIC(5,2),
  bmi_zscore NUMERIC(4,2),
  growth_velocity_cm_yr NUMERIC(4,2),
  bone_age_years NUMERIC(4,2),
  bone_age_method TEXT,
  predicted_adult_height_cm NUMERIC(5,2),
  waist_circumference_cm NUMERIC(5,2),
  head_circumference_cm NUMERIC(5,2),
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  bp_percentile NUMERIC(5,2),
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-calculate BMI
CREATE OR REPLACE FUNCTION calculate_bmi()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.height_cm > 0 AND NEW.weight_kg > 0 THEN
    NEW.bmi := ROUND(NEW.weight_kg / ((NEW.height_cm / 100) ^ 2), 1);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER growth_bmi
  BEFORE INSERT OR UPDATE ON growth_measurements
  FOR EACH ROW EXECUTE FUNCTION calculate_bmi();

CREATE TRIGGER growth_updated_at
  BEFORE UPDATE ON growth_measurements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_growth_child_date ON growth_measurements(child_id, measured_at DESC);

-- ── Visits ────────────────────────────────────────────

CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  visit_date TIMESTAMPTZ NOT NULL,
  visit_type visit_type NOT NULL DEFAULT 'follow_up',
  chief_complaint TEXT,
  assessment TEXT,
  plan TEXT,
  doctor_notes TEXT,
  parent_visible_notes TEXT,
  next_visit_date DATE,
  next_visit_notes TEXT,
  status visit_status NOT NULL DEFAULT 'completed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER visits_updated_at
  BEFORE UPDATE ON visits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_visits_child_date ON visits(child_id, visit_date DESC);

-- ── Prescriptions ─────────────────────────────────────

CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES visits(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  medication_name TEXT NOT NULL,
  dose TEXT,
  frequency TEXT,
  route TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  change_reason TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER prescriptions_updated_at
  BEFORE UPDATE ON prescriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Tanner Staging Records ────────────────────────────

CREATE TABLE tanner_staging_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES visits(id),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  assessed_at DATE NOT NULL,
  breast_stage INTEGER CHECK (breast_stage BETWEEN 1 AND 5),
  pubic_hair_stage INTEGER CHECK (pubic_hair_stage BETWEEN 1 AND 5),
  genital_stage INTEGER CHECK (genital_stage BETWEEN 1 AND 5),
  axillary_hair BOOLEAN,
  menarche BOOLEAN DEFAULT false,
  menarche_date DATE,
  testicular_volume_ml_left NUMERIC(4,1),
  testicular_volume_ml_right NUMERIC(4,1),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── GnRH Stimulation Tests ───────────────────────────

CREATE TABLE gnrh_stimulation_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES visits(id),
  test_date DATE NOT NULL,
  lh_baseline NUMERIC(6,2),
  lh_peak NUMERIC(6,2),
  lh_peak_time_min INTEGER,
  fsh_baseline NUMERIC(6,2),
  fsh_peak NUMERIC(6,2),
  interpretation TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── GH Stimulation Tests ─────────────────────────────

CREATE TABLE gh_stimulation_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES visits(id),
  test_date DATE NOT NULL,
  agent_used TEXT,
  gh_baseline NUMERIC(6,2),
  gh_peak NUMERIC(6,2),
  gh_peak_time_min INTEGER,
  time_series JSONB,
  interpretation TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── GH Prescriptions ─────────────────────────────────

CREATE TABLE gh_prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  medication_name TEXT NOT NULL,
  dose_mg NUMERIC(5,3) NOT NULL,
  dose_iu NUMERIC(5,2),
  frequency TEXT DEFAULT 'daily',
  injection_time_preference TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER gh_prescriptions_updated_at
  BEFORE UPDATE ON gh_prescriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Injection Logs ────────────────────────────────────

CREATE TABLE injection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID NOT NULL REFERENCES gh_prescriptions(id),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  injection_date DATE NOT NULL,
  injection_time TIMESTAMPTZ,
  dose_administered_mg NUMERIC(5,3),
  injection_site injection_site,
  administered_by UUID REFERENCES profiles(id),
  pain_level INTEGER CHECK (pain_level BETWEEN 0 AND 5),
  side_effects TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(prescription_id, injection_date)
);

CREATE INDEX idx_injection_logs_child_date ON injection_logs(child_id, injection_date DESC);

-- ── Lab Reports ───────────────────────────────────────

CREATE TABLE lab_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES visits(id),
  report_date DATE NOT NULL,
  lab_name TEXT,
  category lab_category NOT NULL DEFAULT 'other',
  file_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER lab_reports_updated_at
  BEFORE UPDATE ON lab_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_lab_reports_child ON lab_reports(child_id, report_date DESC);

-- ── Lab Results ───────────────────────────────────────

CREATE TABLE lab_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES lab_reports(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  value NUMERIC(10,3),
  unit TEXT,
  reference_range_low NUMERIC(10,3),
  reference_range_high NUMERIC(10,3),
  is_abnormal BOOLEAN NOT NULL DEFAULT false,
  flag lab_flag NOT NULL DEFAULT 'normal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lab_results_report ON lab_results(report_id);

-- ── Reminders ─────────────────────────────────────────

CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  type reminder_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  recurrence_rule TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER reminders_updated_at
  BEFORE UPDATE ON reminders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_reminders_parent ON reminders(parent_id, scheduled_at)
  WHERE is_completed = false;

-- ── Education Articles ────────────────────────────────

CREATE TABLE education_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  content_zh TEXT NOT NULL,
  content_en TEXT,
  category TEXT[] DEFAULT '{}',
  cover_image_url TEXT,
  author_id UUID REFERENCES doctors(id),
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER education_articles_updated_at
  BEFORE UPDATE ON education_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Auto-create profile on signup ─────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent')
  );

  -- If doctor, also create doctors record
  IF (NEW.raw_user_meta_data->>'role') = 'doctor' THEN
    INSERT INTO doctors (id, license_number, specialty)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'license_number', 'PENDING'),
      ARRAY['pediatric_endocrinology']
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ================================================================
-- Row Level Security (RLS)
-- ================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_child ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_child ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tanner_staging_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE gnrh_stimulation_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gh_stimulation_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gh_prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE injection_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_articles ENABLE ROW LEVEL SECURITY;

-- Profiles: users see/edit own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Children: parents see own children, doctors see assigned patients
CREATE POLICY "Parents can view own children" ON children
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = children.id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can view assigned patients" ON children
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = children.id AND doctor_child.doctor_id = auth.uid() AND doctor_child.status = 'active')
  );
CREATE POLICY "Doctors can insert children" ON children
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'doctor')
  );
CREATE POLICY "Doctors can update assigned children" ON children
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = children.id AND doctor_child.doctor_id = auth.uid())
  );

-- Parent-child: users see own relationships
CREATE POLICY "Users can view own parent_child" ON parent_child
  FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "Doctors can view parent_child" ON parent_child
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'doctor')
  );

-- Doctor-child
CREATE POLICY "Doctors can view own assignments" ON doctor_child
  FOR SELECT USING (doctor_id = auth.uid());
CREATE POLICY "Doctors can manage assignments" ON doctor_child
  FOR ALL USING (doctor_id = auth.uid());

-- Doctors table
CREATE POLICY "Anyone can view doctors" ON doctors
  FOR SELECT USING (true);

-- Growth measurements
CREATE POLICY "Parents can view child growth" ON growth_measurements
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = growth_measurements.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage growth" ON growth_measurements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = growth_measurements.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- Visits: parents see (limited), doctors see all
CREATE POLICY "Parents can view visits" ON visits
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = visits.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage visits" ON visits
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = visits.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- Prescriptions
CREATE POLICY "Parents can view prescriptions" ON prescriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = prescriptions.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage prescriptions" ON prescriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = prescriptions.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- Tanner staging
CREATE POLICY "Parents can view tanner" ON tanner_staging_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = tanner_staging_records.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage tanner" ON tanner_staging_records
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = tanner_staging_records.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- GnRH tests
CREATE POLICY "Parents can view gnrh tests" ON gnrh_stimulation_tests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = gnrh_stimulation_tests.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage gnrh tests" ON gnrh_stimulation_tests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = gnrh_stimulation_tests.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- GH stimulation tests
CREATE POLICY "Parents can view gh tests" ON gh_stimulation_tests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = gh_stimulation_tests.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage gh tests" ON gh_stimulation_tests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = gh_stimulation_tests.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- GH prescriptions
CREATE POLICY "Parents can view gh prescriptions" ON gh_prescriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = gh_prescriptions.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage gh prescriptions" ON gh_prescriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = gh_prescriptions.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- Injection logs: parents can insert (record daily injection) and view
CREATE POLICY "Parents can view injection logs" ON injection_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = injection_logs.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Parents can insert injection logs" ON injection_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = injection_logs.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can view injection logs" ON injection_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = injection_logs.child_id AND doctor_child.doctor_id = auth.uid())
  );

-- Lab reports/results
CREATE POLICY "Parents can view lab reports" ON lab_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM parent_child WHERE parent_child.child_id = lab_reports.child_id AND parent_child.parent_id = auth.uid())
  );
CREATE POLICY "Doctors can manage lab reports" ON lab_reports
  FOR ALL USING (
    EXISTS (SELECT 1 FROM doctor_child WHERE doctor_child.child_id = lab_reports.child_id AND doctor_child.doctor_id = auth.uid())
  );
CREATE POLICY "Users can view lab results via report" ON lab_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lab_reports lr
      JOIN parent_child pc ON pc.child_id = lr.child_id
      WHERE lr.id = lab_results.report_id AND pc.parent_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM lab_reports lr
      JOIN doctor_child dc ON dc.child_id = lr.child_id
      WHERE lr.id = lab_results.report_id AND dc.doctor_id = auth.uid()
    )
  );
CREATE POLICY "Doctors can manage lab results" ON lab_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM lab_reports lr
      JOIN doctor_child dc ON dc.child_id = lr.child_id
      WHERE lr.id = lab_results.report_id AND dc.doctor_id = auth.uid()
    )
  );

-- Reminders
CREATE POLICY "Parents can manage own reminders" ON reminders
  FOR ALL USING (parent_id = auth.uid());

-- Education articles: published are public
CREATE POLICY "Published articles visible to all" ON education_articles
  FOR SELECT USING (is_published = true);
CREATE POLICY "Doctors can manage articles" ON education_articles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'doctor')
  );
