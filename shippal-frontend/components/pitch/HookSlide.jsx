import { Store, Truck, FileCheck } from "lucide-react";

export function HookSlide() {
    return (
        <section>
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-12 text-gray-200">What is ShipPal?</h2>
                <div className="r-stack w-full">
                    <div className="fragment fade-in-then-out flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl">
                        <Store className="w-24 h-24 text-blue-400 mb-6 opacity-80" strokeWidth={1} />
                        <p className="text-2xl font-medium text-gray-300">A B2B Marketplace?</p>
                    </div>
                    <div className="fragment fade-in-then-out flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl">
                        <Truck className="w-24 h-24 text-red-400 mb-6 opacity-80" strokeWidth={1} />
                        <p className="text-2xl font-medium text-gray-300">A Logistics Forwarder?</p>
                    </div>
                    <div className="fragment fade-in-then-out flex flex-col items-center justify-center p-8 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl">
                        <FileCheck className="w-24 h-24 text-green-400 mb-6 opacity-80" strokeWidth={1} />
                        <p className="text-2xl font-medium text-gray-300">A Compliance Tool?</p>
                    </div>
                    <div className="fragment fade-up">
                        <div className="p-10 border border-blue-500/20 rounded-2xl bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-xl shadow-2xl">
                            <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text mb-3">
                                Tinder for Global Trade
                            </p>
                            <p className="text-lg text-gray-400 font-light">
                                Smart Matchmaking + AI Autonomous Agents
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
