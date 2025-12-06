"use client";

import RevealWrapper from "@/components/RevealWrapper";
import { TitleSlide } from "@/components/pitch/TitleSlide";
import { HookSlide } from "@/components/pitch/HookSlide";
import { ProblemSlide } from "@/components/pitch/ProblemSlide";
import { SolutionSlide } from "@/components/pitch/SolutionSlide";
import { MatchSlide } from "@/components/pitch/MatchSlide";
import { DemoSlide } from "@/components/pitch/DemoSlide";
import { DealSlide } from "@/components/pitch/DealSlide";
import { TranslateSlide } from "@/components/pitch/TranslateSlide";
import { MarketSlide } from "@/components/pitch/MarketSlide";
import { ClosingSlide } from "@/components/pitch/ClosingSlide";

export default function PitchPage() {
  return (
    <div className="h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <RevealWrapper options={{
        controls: true,
        progress: true,
        history: true,
        center: true,
        width: 1920,
        height: 1080,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        transition: 'slide',
        backgroundTransition: 'fade'
      }}>
        <TitleSlide />
        <HookSlide />
        <ProblemSlide />
        <SolutionSlide />
        <MatchSlide />
        <DemoSlide />
        <TranslateSlide />
        <DealSlide />
        <MarketSlide />
        <ClosingSlide />
      </RevealWrapper>
    </div>
  );
}
