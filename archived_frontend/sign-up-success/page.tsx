import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle2 } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <>
      <Header />
      <main className="bg-background min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border/40 rounded-lg p-8 space-y-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold">Account Created!</h1>
              <p className="text-muted-foreground">
                Please check your email to verify your account before signing in.
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Didn't receive an email? Check your spam folder.</p>
            </div>

            <Link
              href="/auth/login"
              className="inline-block w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
