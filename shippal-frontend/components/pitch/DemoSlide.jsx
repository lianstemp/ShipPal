"use client"

export function DemoSlide() {
    return (
        <section className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">The Deal Room</h2>
                <p className="text-zinc-400 text-lg">Negotiate, chat, and seal deals in one unified workspace.</p>
            </div>

            <div className="w-full h-auto flex items-center justify-center">
                {/* User will upload image here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/pitch/dealroom.png"
                    alt="Demo Slide"
                    className="w-full h-auto object-contain rounded-xl shadow-2xl"
                />
            </div>
        </section>
    )
}
