"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Link from "next/link";
import { CloudDecoration } from "@/components/layout/cloud-decoration";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"parent" | "doctor">("parent");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("密碼不一致");
      return;
    }
    if (password.length < 6) {
      toast.error("密碼至少 6 個字元");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          role,
        },
      },
    });

    if (error) {
      toast.error("註冊失敗", { description: error.message });
      setLoading(false);
      return;
    }

    toast.success("註冊成功！", { description: "請查看信箱確認郵件，或直接登入。" });
    router.push("/login");
    setLoading(false);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
      <CloudDecoration />
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-7 w-7 text-primary" fill="currentColor" />
            </div>
            <CardTitle className="font-heading text-2xl">建立帳號</CardTitle>
            <CardDescription>加入 PediHealth 兒童照護平台</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {/* Role selector */}
              <div className="flex flex-col gap-2">
                <Label>選擇身份</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("parent")}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors ${
                      role === "parent"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl">👨‍👩‍👧</span>
                    <span>家長</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("doctor")}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors ${
                      role === "doctor"
                        ? "border-sky bg-sky/5 text-sky"
                        : "border-border bg-white text-muted-foreground hover:border-sky/30"
                    }`}
                  >
                    <span className="text-2xl">🩺</span>
                    <span>醫師</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="displayName">姓名</Label>
                <Input
                  id="displayName"
                  placeholder="您的姓名"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="password">密碼</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="至少 6 個字元"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">確認密碼</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再次輸入密碼"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                註冊
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                已有帳號？{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  登入
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
