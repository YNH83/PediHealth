"use client";

import { useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { Globe } from "lucide-react";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  function switchLocale(locale: Locale) {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    router.refresh();
  }

  const next = locales.find((l) => l !== current) ?? locales[0];

  return (
    <button
      onClick={() => switchLocale(next)}
      className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-white hover:text-foreground"
      title={`Switch to ${localeNames[next]}`}
    >
      <Globe className="h-4 w-4" />
      <span>{localeNames[next]}</span>
    </button>
  );
}
