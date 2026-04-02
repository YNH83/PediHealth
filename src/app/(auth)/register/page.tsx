import { getTranslations } from "next-intl/server";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RegisterPage() {
  const t = await getTranslations("auth");

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-8 w-8 text-primary" fill="currentColor" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          PediHealth
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("loginSubtitle")}
        </p>
      </div>

      <Card className="border-border/50 shadow-lg shadow-primary/5">
        <CardHeader className="pb-4 text-center">
          <h2 className="font-heading text-lg font-bold">{t("signUp")}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("selectRole")}</Label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 rounded-xl border-2 border-primary bg-primary/5 p-4 text-sm font-medium text-primary transition-colors">
                <span className="text-2xl">👨‍👩‍👧</span>
                <span>{t("parent")}</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-xl border-2 border-border bg-white p-4 text-sm font-medium text-muted-foreground transition-colors hover:border-sky hover:text-sky">
                <span className="text-2xl">🩺</span>
                <span>{t("doctor")}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              className="rounded-xl"
            />
          </div>

          <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            {t("signUp")}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              {t("signIn")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
