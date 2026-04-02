"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  TrendingUp,
  Stethoscope,
  Syringe,
  FlaskConical,
  BookOpen,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" },
  { href: "/growth", icon: TrendingUp, labelKey: "growth" },
  { href: "/visits", icon: Stethoscope, labelKey: "visits" },
  { href: "/injections", icon: Syringe, labelKey: "injections" },
  { href: "/labs", icon: FlaskConical, labelKey: "labs" },
  { href: "/education", icon: BookOpen, labelKey: "education" },
  { href: "/settings", icon: Settings, labelKey: "settings" },
];

export function ParentSidebar() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/50 bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border/50 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Heart className="h-5 w-5 text-primary" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-heading text-lg font-bold text-foreground">
            PediHealth
          </h1>
          <p className="text-xs text-muted-foreground">Care Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{t(item.labelKey)}</span>
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border/50 p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
          <span>{t("profile")}</span>
        </button>
      </div>
    </aside>
  );
}
