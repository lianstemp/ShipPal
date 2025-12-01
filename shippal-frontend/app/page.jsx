import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, ShieldCheck, MessageSquareText, TrendingUp, Users, Zap } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-zinc-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-50 mix-blend-screen animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-30" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-zinc-300">Hackathon Ready v1.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Make Local <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
              Go Global.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-zinc-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The "Tinder for Export" platform connecting MSMEs with international buyers.
            Swipe, match, and trade with AI-powered compliance and logistics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-all hover:scale-105">
                Start Trading Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 transition-all">
                How it Works
              </Button>
            </Link>
          </div>

          {/* Stats / Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {[
              { label: "Active Buyers", value: "500+" },
              { label: "Countries", value: "50+" },
              { label: "Verified MSMEs", value: "2.5k" },
              { label: "Trade Volume", value: "$10M+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-zinc-950 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to export</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              We handle the complexities of international trade so you can focus on production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-yellow-400" />,
                title: "Smart Matching",
                desc: "Our AI algorithm matches supply capacity with buyer demand instantly. No more cold calling."
              },
              {
                icon: <MessageSquareText className="w-10 h-10 text-blue-400" />,
                title: "The Deal Room",
                desc: "Chat with real-time translation and AI negotiation coaching to close deals faster."
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-green-400" />,
                title: "AI Compliance",
                desc: "Automated document generation (Invoice, Packing List) and regulatory checks per country."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 duration-300">
                <div className="mb-6 p-4 rounded-2xl bg-zinc-900 w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works (Steps) */}
      <section id="how-it-works" className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                From Local Warehouse to <br />
                <span className="text-blue-500">Global Port</span>
              </h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Create Profile", desc: "Sign up as a Buyer or Seller and verify your identity." },
                  { step: "02", title: "Post & Swipe", desc: "Post your products or requests. Swipe right on matches." },
                  { step: "03", title: "Negotiate", desc: "Enter the Deal Room to finalize price, quantity, and terms." },
                  { step: "04", title: "Ship & Pay", desc: "Use our escrow payment and integrated logistics partners." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-5xl font-bold text-white/10">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              {/* Abstract Visual Representation of App */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                <div className="relative h-full w-full bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                  <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="h-6 w-32 bg-white/10 rounded-full" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
                    <div className="w-48 h-64 bg-zinc-900 rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="h-4 w-24 bg-white/50 rounded mb-2" />
                        <div className="h-3 w-16 bg-white/30 rounded" />
                      </div>
                      {/* Swipe Indicators */}
                      <div className="absolute top-4 right-4 bg-green-500/20 text-green-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-green-500">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to expand your market?</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already trading globally on ShipPal.
          </p>
          <Link href="/login">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">ShipPal</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2024 ShipPal Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
