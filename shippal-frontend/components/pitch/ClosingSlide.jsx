import { CheckCircle, Github, Globe } from "lucide-react";

export function ClosingSlide() {
    return (
        <section data-state="closing-slide">
            <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                    <CheckCircle className="w-10 h-10 text-green-400" strokeWidth={1.5} />
                </div>
                <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-600 tracking-tight">
                    ShipPal
                </h1>
                <p className="text-lg text-gray-500 mb-10 font-light tracking-wide">
                    Transforming the future of trade. One swipe at a time.
                </p>

                <div className="flex gap-4">
                    <a
                        href="https://shippal.vessail.app/"
                        target="_blank"
                        className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] text-sm"
                    >
                        <Globe size={18} />
                        Live Demo
                    </a>
                    <a
                        href="https://github.com/lianstemp/shippal"
                        target="_blank"
                        className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] text-sm"
                    >
                        <Github size={18} />
                        View on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
