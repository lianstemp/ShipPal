import { Smartphone, MessageCircle, Ship } from "lucide-react";

export function SolutionSlide() {
    return (
        <section>
            <h2 className="text-4xl font-bold mb-12 text-white"><span className="text-blue-500">The Solution</span></h2>
            <div className="flex flex-row items-stretch justify-center gap-6">
                <div className="fragment fade-up w-[280px]">
                    <div className="h-full bg-gray-900/30 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-500 flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                            <Smartphone className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">Swipe</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Discover partners instantly with our algorithm matching supply to demand.</p>
                    </div>
                </div>
                <div className="fragment fade-up w-[280px] transition-delay-100">
                    <div className="h-full bg-gray-900/30 p-6 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-500 flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors">
                            <MessageCircle className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">Negotiate</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Deal Room with real-time translation and AI negotiation coaching.</p>
                    </div>
                </div>
                <div className="fragment fade-up w-[280px] transition-delay-200">
                    <div className="h-full bg-gray-900/30 p-6 rounded-2xl border border-gray-800 hover:border-teal-500/30 transition-all duration-500 flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors">
                            <Ship className="w-8 h-8 text-teal-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">Ship</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">One-click generation of compliant invoices, COOs, and packing lists.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
