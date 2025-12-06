import Image from "next/image";

export function TitleSlide() {
    return (
        <section data-state="intro-slide">
            <div className="flex flex-col items-center justify-center p-8">
                <div className="mb-8 p-6 bg-gradient-to-br from-white/5 to-transparent rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
                    <Image src="/logo.svg" alt="ShipPal Logo" width={120} height={120} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                </div>
                <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-indigo-500 tracking-tight">
                    ShipPal
                </h1>
                <h3 className="text-xl text-gray-400 font-light tracking-[0.3em] uppercase mb-8">
                    Make Local Go Global
                </h3>
                <p className="text-sm text-gray-500/60 font-mono border-t border-gray-800 pt-8 mt-4">
                    The Modern Operating System for International Trade
                </p>
            </div>
        </section>
    );
}
