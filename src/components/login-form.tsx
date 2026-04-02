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
import { Heart } from "lucide-react"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form className="flex flex-col gap-4">
            {/* Role buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" className="h-auto py-3">
                <span className="mr-2 text-lg">👨‍👩‍👧</span> 家長登入
              </Button>
              <Button variant="outline" type="button" className="h-auto py-3">
                <span className="mr-2 text-lg">🩺</span> 醫師登入
              </Button>
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">電子信箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
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
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              登入
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              還沒有帳號？{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                立即註冊
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
