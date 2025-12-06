"use client"

export function TranslateSlide() {
    return (
        <section className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Break Language Barriers</h2>
                <p className="text-zinc-400 text-lg">Seamless communication. Auto-translation for English and Indonesian.</p>
            </div>

            <div className="w-full h-auto flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/pitch/autotranslate.png"
                    alt="Auto Translation Feature"
                    className="w-full h-auto object-contain rounded-xl shadow-2xl"
                />
            </div>
        </section>
    )
}
