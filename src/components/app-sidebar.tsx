"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Heart,
  LayoutDashboard,
  TrendingUp,
  Stethoscope,
  Syringe,
  FlaskConical,
  BookOpen,
  Settings,
  Users,
  Brain,
} from "lucide-react"

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <Heart className="h-4 w-4 text-primary" fill="currentColor" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
        <span className="font-heading truncate font-bold">PediHealth</span>
        <span className="truncate text-xs text-muted-foreground">Care Portal</span>
      </div>
    </div>
  )
}

const parentNav = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" },
  { href: "/growth", icon: TrendingUp, labelKey: "growth" },
  { href: "/prediction", icon: Brain, labelKey: "prediction" },
  { href: "/visits", icon: Stethoscope, labelKey: "visits" },
  { href: "/injections", icon: Syringe, labelKey: "injections" },
  { href: "/labs", icon: FlaskConical, labelKey: "labs" },
  { href: "/education", icon: BookOpen, labelKey: "education" },
  { href: "/settings", icon: Settings, labelKey: "settings" },
]

const doctorNav = [
  { href: "/doctor/dashboard", icon: LayoutDashboard, labelKey: "dashboard" },
  { href: "/doctor/patients", icon: Users, labelKey: "patients" },
  { href: "/doctor/settings", icon: Settings, labelKey: "settings" },
]

export function AppSidebar({
  role = "parent",
  ...props
}: React.ComponentProps<typeof Sidebar> & { role?: "parent" | "doctor" }) {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const nav = role === "doctor" ? doctorNav : parentNav

  const user = role === "doctor"
    ? { name: "蘇本華 醫師", email: "doctor@pedihealth.com", avatar: "" }
    : { name: "Demo Parent", email: "parent@pedihealth.com", avatar: "" }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role === "doctor" ? "Doctor Panel" : "照護功能"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {nav.map((item) => {
              const isActive = role === "doctor"
                ? pathname.startsWith(item.href)
                : pathname === item.href
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={t(item.labelKey)}
                    isActive={isActive}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{t(item.labelKey)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
