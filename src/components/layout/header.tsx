"use client";

import { useLocale } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { type Locale } from "@/lib/i18n/config";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { toast } from "sonner";

export function Header({
  userName = "User",
  role,
}: {
  userName?: string;
  role: "parent" | "doctor";
}) {
  const locale = useLocale() as Locale;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-white/80 px-6 backdrop-blur-sm">
      <div />
      <div className="flex items-center gap-3">
        <LocaleSwitcher current={locale} />

        <button
          onClick={() => toast.info("通知功能即將推出")}
          className="relative rounded-full bg-white p-2 text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback
              className={
                role === "doctor"
                  ? "bg-sky/20 text-sky text-xs font-bold"
                  : "bg-primary/20 text-primary text-xs font-bold"
              }
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}
