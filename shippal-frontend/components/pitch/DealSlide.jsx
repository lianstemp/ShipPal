"use client"

export function DealSlide() {
    return (
        <section className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Compliance on Autopilot</h2>
                <p className="text-zinc-400 text-lg">Auto-generate commercial invoices and packing lists. No more paperwork headaches.</p>
            </div>

            <div className="w-full h-auto flex items-center justify-center">
                {/* User will upload image here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/pitch/autodoc.png"
                    alt="Deal Slide"
                    className="w-full h-auto object-contain rounded-xl shadow-2xl"
                />
            </div>
        </section>
    )
}
