import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Globe, ShieldCheck, Handshake, Ship, TrendingUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Ship className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">ShipPal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-zinc-50 to-zinc-50 dark:from-blue-950/30 dark:via-zinc-950 dark:to-zinc-950"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              The Future of B2B Export is Here
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl mb-6">
              Make Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Go Global</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              ShipPal connects Indonesian MSMEs with international buyers through smart AI matchmaking.
              Swipe to match, chat to deal, and export with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 rounded-full">
                  Start Matching Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Stats / Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">500+</span>
                <span className="text-sm text-zinc-500">Verified Sellers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">50+</span>
                <span className="text-sm text-zinc-500">Countries Reached</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">$2M+</span>
                <span className="text-sm text-zinc-500">Export Value</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">98%</span>
                <span className="text-sm text-zinc-500">Success Rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
                Everything you need to export
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                We handle the complexities of international trade so you can focus on producing quality products.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Handshake className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Smart Matchmaking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Our "Tinder-like" swiping system matches you with partners that fit your capacity and requirements perfectly. No more mismatches.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">AI Compliance Officer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Automatically generate invoices, packing lists, and check compliance for destination countries. Avoid customs delays with AI.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Global Logistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Integrated logistics solutions and escrow payments ensure your goods arrive safely and you get paid on time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Ready to expand your business?
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-10">
              Join thousands of MSMEs and buyers who are already trading globally with ShipPal.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-zinc-900 hover:bg-zinc-100 rounded-full font-semibold">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Ship className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">ShipPal</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © 2024 ShipPal Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
