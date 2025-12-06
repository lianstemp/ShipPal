"use client";

import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css"; // Basic dark theme, can be changed
// Optional: import plugins if needed
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

export default function RevealWrapper({ children, options = {} }) {
    const deckDivRef = useRef(null);
    const deckRef = useRef(null);

    useEffect(() => {
        // Prevent double initialization in React Strict Mode
        if (deckRef.current) return;

        if (deckDivRef.current) {
            deckRef.current = new Reveal(deckDivRef.current, {
                hash: true,
                embedded: false, // Make it full screen
                ...options,
            });

            deckRef.current.initialize().then(() => {
                // console.log("Reveal initialized");
            });
        }

        return () => {
            try {
                if (deckRef.current) {
                    deckRef.current.destroy();
                    deckRef.current = null;
                }
            } catch (e) {
                console.warn("Reveal destroy failed", e);
            }
        };
    }, [options]);

    return (
        <div className="reveal" ref={deckDivRef}>
            <div className="slides">{children}</div>
        </div>
    );
}
