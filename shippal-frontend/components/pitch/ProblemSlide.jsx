import { Clock, FileWarning, Languages, DollarSign } from "lucide-react";

export function ProblemSlide() {
    return (
        <>
            <section>
                <div className="flex flex-col items-center">
                    <h2 className="text-gray-600 text-sm font-mono mb-4 uppercase tracking-[0.2em]">The Challenge</h2>
                    <h3 className="text-4xl font-bold mb-6 text-gray-100">Exporting is <span className="text-red-500/90 underline decoration-red-500/30 decoration-2 underline-offset-4">Broken</span></h3>
                    <p className="text-gray-400 max-w-xl text-center text-base leading-relaxed font-light">
                        For millions of SMEs, global trade is a minefield of paperwork, language barriers, and trust issues.
                    </p>
                </div>
            </section>
            <section>
                <div className="grid grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                    <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 transition-all duration-300">
                        <Clock className="w-8 h-8 text-orange-400 mb-3" />
                        <h4 className="text-lg font-bold mb-1 text-gray-200">Slow Discovery</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Finding buyers takes months of cold calls and expensive trade shows.</p>
                    </div>
                    <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 transition-all duration-300 fragment">
                        <FileWarning className="w-8 h-8 text-red-400 mb-3" />
                        <h4 className="text-lg font-bold mb-1 text-gray-200">Complex Compliance</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Regulatory mistakes cause shipment seizures and massive fines.</p>
                    </div>
                    <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 transition-all duration-300 fragment">
                        <Languages className="w-8 h-8 text-purple-400 mb-3" />
                        <h4 className="text-lg font-bold mb-1 text-gray-200">Language Barriers</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Miscommunication on specs leads to disputes and failed deals.</p>
                    </div>
                    <div className="p-6 border border-gray-800 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 transition-all duration-300 fragment">
                        <DollarSign className="w-8 h-8 text-green-400 mb-3" />
                        <h4 className="text-lg font-bold mb-1 text-gray-200">High Friction</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">Middlemen capture up to 40% of the value chain.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
