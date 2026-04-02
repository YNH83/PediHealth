export interface EducationArticle {
  id: string;
  slug: string;
  titleZh: string;
  titleEn: string;
  category: string;
  coverEmoji: string;
  summary: string;
  contentZh: string;
  readTimeMin: number;
  publishedAt: string;
}

export const mockArticles: EducationArticle[] = [
  {
    id: "edu-1",
    slug: "what-is-precocious-puberty",
    titleZh: "什麼是性早熟？家長必知的完整指南",
    titleEn: "What is Precocious Puberty? A Complete Guide for Parents",
    category: "precocious_puberty",
    coverEmoji: "🌸",
    summary: "了解性早熟的定義、原因、診斷方式和治療選項，幫助您及早發現並陪伴孩子度過。",
    contentZh: `## 什麼是性早熟？

性早熟是指兒童在正常青春期年齡之前出現第二性徵的發育。一般來說：
- **女孩**在 8 歲之前出現乳房發育
- **男孩**在 9 歲之前出現睾丸增大

## 常見徵兆

### 女孩
- 乳房開始發育（乳暈下方出現硬塊）
- 陰毛或腋毛生長
- 身高突然快速增長
- 月經提前出現

### 男孩
- 睾丸或陰莖增大
- 陰毛生長
- 聲音變粗
- 體味變重

## 什麼時候該看醫師？

如果您發現孩子出現上述任何徵兆，建議及早就醫評估。醫師會透過以下檢查來確認診斷：

1. **Tanner 分期評估** - 評估第二性徵的發育程度
2. **骨齡 X 光** - 評估骨骼成熟度是否超前
3. **血液荷爾蒙檢查** - 包括 LH、FSH、Estradiol/Testosterone
4. **GnRH 刺激試驗** - 確認中樞性或周邊性性早熟
5. **腦部 MRI** - 排除中樞神經系統病變

## 治療方式

中樞性性早熟最常見的治療方式是 **GnRH 促效劑（GnRH agonist）**：
- 藥物名稱：Leuprolide（柳培林）
- 給藥方式：每月一次肌肉注射
- 作用：抑制青春期荷爾蒙的分泌，讓發育暫停
- 治療期間需定期追蹤 Tanner 分期和骨齡

## 治療效果

大部分孩子在治療後，第二性徵會逐漸退縮，骨齡超前的情況也會改善，最終可以保護成人身高。`,
    readTimeMin: 5,
    publishedAt: "2026-03-01",
  },
  {
    id: "edu-2",
    slug: "growth-hormone-injection-guide",
    titleZh: "生長激素注射完整教學：給家長的實用指南",
    titleEn: "Growth Hormone Injection Guide for Parents",
    category: "gh_therapy",
    coverEmoji: "💉",
    summary: "從準備、注射步驟到注意事項，手把手教您如何幫孩子進行每日生長激素注射。",
    contentZh: `## 為什麼需要注射生長激素？

當孩子被診斷為生長激素缺乏症（GHD）時，醫師會開立生長激素（Growth Hormone, GH）注射治療。這是目前唯一有效的補充方式。

## 注射前準備

1. **洗手** - 用肥皂和水徹底洗手至少 20 秒
2. **確認藥物** - 檢查藥物名稱、劑量、有效期限
3. **準備注射筆** - 依照廠牌說明書裝載藥劑
4. **選擇注射部位** - 每次輪替不同部位

## 注射部位輪替

為避免皮下脂肪萎縮，請遵守部位輪替原則：
- 左大腿 → 右大腿 → 左腹部 → 右腹部 → 左手臂 → 右手臂
- 每次注射距離上次同部位至少 2 公分以上

## 注射步驟

1. 用酒精棉片消毒注射部位
2. 以 45-90 度角將針頭刺入皮下
3. 緩慢推入藥液（約 5-10 秒）
4. 停留 5 秒後再拔出針頭
5. 用棉球輕壓注射處，不要搓揉

## 常見問題

**Q: 最佳注射時間？**
A: 建議在睡前注射，因為生長激素在睡眠時自然分泌最多。

**Q: 漏打了怎麼辦？**
A: 如果漏打一天，隔天按正常劑量注射即可，不需要加倍劑量。

**Q: 注射會痛嗎？**
A: 現代注射筆的針頭非常細（31-32G），大多數孩子表示只有輕微刺痛感。`,
    readTimeMin: 6,
    publishedAt: "2026-02-15",
  },
  {
    id: "edu-3",
    slug: "understanding-growth-charts",
    titleZh: "看懂生長曲線：您的孩子長得好嗎？",
    titleEn: "Understanding Growth Charts: Is Your Child Growing Well?",
    category: "growth_delay",
    coverEmoji: "📈",
    summary: "學會看生長曲線圖，了解百分位、生長速率和骨齡的意義。",
    contentZh: `## 什麼是生長曲線？

生長曲線是將孩子的身高、體重等數據，和同年齡同性別的台灣兒童標準比較的圖表。

## 重要指標

### 百分位（Percentile）
- **P50** 代表中位數，即一半的孩子比這高，一半比這矮
- **P3** 代表 100 個同齡孩子中，只有 3 個比您的孩子矮
- **P97** 代表只有 3 個比您的孩子高
- 一般來說 P3 到 P97 之間都屬正常範圍

### 生長速率
比百分位更重要的是**生長速率**（每年長多少公分）：
- 2-4 歲：約 7-8 cm/年
- 4-6 歲：約 5-7 cm/年
- 青春期前：約 4-6 cm/年
- 青春期：女孩 8-12 cm/年，男孩 10-14 cm/年

### 骨齡
骨齡反映骨骼的成熟度：
- **骨齡 = 實際年齡**：正常
- **骨齡 < 實際年齡**：骨骼發育較慢，可能還有成長空間
- **骨齡 > 實際年齡**：骨骼發育較快，可能提早停止成長

## 什麼時候該擔心？

- 身高持續低於 P3
- 生長速率明顯下降（跨越兩個百分位線）
- 骨齡與實際年齡差距超過 2 年`,
    readTimeMin: 4,
    publishedAt: "2026-03-10",
  },
  {
    id: "edu-4",
    slug: "childhood-obesity-management",
    titleZh: "兒童肥胖的健康管理：飲食、運動與心理支持",
    titleEn: "Managing Childhood Obesity: Diet, Exercise & Emotional Support",
    category: "obesity",
    coverEmoji: "🍎",
    summary: "用正確的方式幫助孩子建立健康的生活習慣，避免代謝症候群的發生。",
    contentZh: `## 兒童肥胖的定義

依據 BMI 百分位：
- **BMI ≥ 85th percentile**：過重
- **BMI ≥ 95th percentile**：肥胖

## 可能的健康風險

- 第二型糖尿病前期（胰島素阻抗）
- 血脂異常（高三酸甘油酯、低 HDL）
- 非酒精性脂肪肝（NAFLD）
- 高血壓
- 心理問題（自卑、霸凌）

## 飲食建議

1. **增加蔬菜水果攝取** - 每餐至少半盤蔬菜
2. **減少含糖飲料** - 改喝白開水或無糖茶
3. **控制份量** - 使用較小的碗盤
4. **規律三餐** - 不跳餐，減少零食
5. **全家一起改變** - 不要只針對孩子，全家人一起健康飲食

## 運動建議

- 每天至少 60 分鐘中等強度運動
- 減少螢幕時間（每天不超過 2 小時）
- 選擇孩子喜歡的運動（游泳、跳繩、球類）
- 家長一起參與，增加趣味性

## 心理支持

- **不要用食物作為獎懲工具**
- 不要在孩子面前批評體型
- 關注健康，而非體重數字
- 適時尋求心理諮商支持`,
    readTimeMin: 5,
    publishedAt: "2026-02-20",
  },
  {
    id: "edu-5",
    slug: "short-stature-evaluation",
    titleZh: "孩子長不高？矮小症的完整評估流程",
    titleEn: "Short Stature Evaluation: What to Expect",
    category: "growth_delay",
    coverEmoji: "📏",
    summary: "了解矮小症的評估流程，包括生長激素刺激試驗和相關檢查。",
    contentZh: `## 什麼是矮小症？

當孩子的身高低於同年齡同性別的第 3 百分位（P3），或生長速率明顯低於正常，就需要進一步評估。

## 評估流程

### 第一步：基本評估
- 詳細病史（出生史、營養、慢性疾病）
- 家族史（父母身高、家族成員）
- 理學檢查（身體比例、Tanner 分期）
- 計算目標身高（Mid-parental height）

### 第二步：初步檢驗
- 甲狀腺功能（TSH、Free T4）
- IGF-1、IGFBP-3
- CBC、肝腎功能
- 骨齡 X 光
- Celiac disease 篩檢（女童加做染色體）

### 第三步：生長激素刺激試驗
如果 IGF-1 偏低或臨床高度懷疑，醫師會安排：
- 需要住院半天
- 給予刺激藥物（Clonidine 或 Insulin）
- 每 30 分鐘抽血測 GH，共 2-3 小時
- GH peak < 10 ng/mL 即診斷為 GH 缺乏

### 第四步：腦部 MRI
確認 GH 缺乏後，需要做腦部 MRI 檢查腦下垂體是否有結構異常。

## 治療

確診 GH 缺乏後，即可開始每日生長激素注射治療。大部分孩子在治療後 3-6 個月即可看到生長速率明顯改善。`,
    readTimeMin: 5,
    publishedAt: "2026-01-25",
  },
];

export const categoryInfo: Record<string, { zh: string; en: string; emoji: string; color: string }> = {
  precocious_puberty: { zh: "性早熟", en: "Precocious Puberty", emoji: "🌸", color: "bg-primary/10 text-primary" },
  gh_therapy: { zh: "生長激素治療", en: "GH Therapy", emoji: "💉", color: "bg-sky/10 text-sky" },
  growth_delay: { zh: "生長遲緩", en: "Growth Delay", emoji: "📈", color: "bg-mint/10 text-green-700" },
  obesity: { zh: "兒童肥胖", en: "Childhood Obesity", emoji: "🍎", color: "bg-peach/20 text-orange-600" },
};
