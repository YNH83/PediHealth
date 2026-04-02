"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Heart, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error("登入失敗", { description: error.message })
      setLoading(false)
      return
    }

    // Fetch role to redirect
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profile?.role === "doctor") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/dashboard")
      }
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-7 w-7 text-primary" fill="currentColor" />
          </div>
          <CardTitle className="font-heading text-2xl">PediHealth</CardTitle>
          <CardDescription>兒童內分泌照護入口</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Demo Quick Access */}
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Badge className="rounded-full bg-primary/20 text-primary text-xs">
                  DEMO 模式
                </Badge>
              </div>
              <p className="mb-3 text-center text-xs text-muted-foreground">
                無需帳號，直接體驗完整功能
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  className="h-auto py-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                  onClick={() => router.push("/dashboard?demo=true")}
                >
                  <span className="mr-2 text-lg">👨‍👩‍👧</span> 家長端
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="h-auto py-3 border-sky/20 hover:bg-sky/10 hover:border-sky/40"
                  onClick={() => router.push("/doctor/dashboard?demo=true")}
                >
                  <span className="mr-2 text-lg">🩺</span> 醫師端
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  或以帳號密碼登入
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">電子信箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">密碼</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    忘記密碼？
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                登入
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              還沒有帳號？{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                立即註冊
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
