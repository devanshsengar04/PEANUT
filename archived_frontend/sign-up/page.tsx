import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 border border-border rounded-xl text-center">
        <h2 className="text-3xl font-bold">Join GreenAI</h2>
        <p className="text-muted-foreground">This is a local instance running with a mock backend.</p>
        <Link href="/dashboard" className="block w-full py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
          Create Demo Account
        </Link>
      </div>
    </div>
  )
}
