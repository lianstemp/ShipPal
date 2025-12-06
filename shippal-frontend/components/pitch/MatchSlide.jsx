"use client"

export function MatchSlide() {
    return (
        <section className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Discover Global Opportunities</h2>
                <p className="text-zinc-400 text-lg">Curated matches. Verified partners. The easiest way to find your next deal.</p>
            </div>

            <div className="w-full h-full h-max-5xl flex items-center justify-center">
                {/* User will upload image here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/pitch/matchmaking.png"
                    alt="Match Slide"
                    className="w-full h-auto object-contain rounded-xl shadow-2xl"
                />
            </div>
        </section>
    )
}
