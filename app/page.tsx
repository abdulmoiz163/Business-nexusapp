import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
              <path d="M12 13v8" />
              <path d="M5 13v6a2 2 0 0 0 2 2h8" />
            </svg>
            <span className="text-xl font-bold">Business Nexus</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-muted py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Connect with the right people</h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Business Nexus helps entrepreneurs and investors find each other, collaborate, and build successful
              ventures together.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/register?role=entrepreneur">
                <Button size="lg" className="w-full sm:w-auto">
                  Join as Entrepreneur
                </Button>
              </Link>
              <Link href="/register?role=investor">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join as Investor
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container">
            <h2 className="mb-10 text-center text-3xl font-bold">How Business Nexus Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 text-xl font-semibold">Create a Profile</h3>
                <p className="mt-2 text-muted-foreground">
                  Sign up as an entrepreneur or investor and create your professional profile.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 text-xl font-semibold">Connect & Collaborate</h3>
                <p className="mt-2 text-muted-foreground">
                  Find the right partners, send collaboration requests, and build your network.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 text-xl font-semibold">Communicate in Real-time</h3>
                <p className="mt-2 text-muted-foreground">
                  Use our built-in chat system to discuss opportunities and partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Business Nexus. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
