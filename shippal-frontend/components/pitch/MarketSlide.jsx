import { Globe, TrendingUp, Clock } from "lucide-react";

export function MarketSlide() {
    return (
        <section>
            <h2 className="text-4xl font-bold mb-16">The Opportunity</h2>
            <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="p-10 bg-gray-900/50 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform duration-300 group">
                    <Globe className="w-16 h-16 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-7xl font-bold text-white mb-2 tracking-tighter">$5.2T</h3>
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-4">Global B2B E-commerce</p>
                </div>
                <div className="p-10 bg-gray-900/50 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform duration-300 group">
                    <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-7xl font-bold text-white mb-2 tracking-tighter">43%</h3>
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-4">SMEs in Global Trade</p>
                </div>
                <div className="p-10 bg-gray-900/50 rounded-3xl border border-gray-800 text-center hover:-translate-y-2 transition-transform duration-300 group">
                    <Clock className="w-16 h-16 text-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-7xl font-bold text-white mb-2 tracking-tighter">10x</h3>
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-4">Faster Deals</p>
                </div>
            </div>
        </section>
    );
}
