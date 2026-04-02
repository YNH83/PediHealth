import { LoginForm } from "@/components/login-form"
import { CloudDecoration } from "@/components/layout/cloud-decoration"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
      <CloudDecoration />
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
