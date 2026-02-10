"use client";

import { gsap } from "gsap";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { setScrollEnabled } from "@/lib/lenis";

interface PreloaderProps {
    onComplete?: () => void;
    skip?: boolean;
}

function Preloader({ onComplete, skip = false }: PreloaderProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (skip) {
            if (containerRef.current) containerRef.current.style.display = "none";
            onComplete?.();
            return;
        }

        // 1. Initial lock attempt
        setScrollEnabled(false);

        // 2. Delayed lock attempt to catch Lenis if it initializes later
        const timer = setTimeout(() => {
            setScrollEnabled(false);
        }, 100);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onStart: () => {
                    // 3. Safety lock on animation start
                    setScrollEnabled(false);
                },
                onComplete: () => {
                    if (containerRef.current) containerRef.current.style.display = "none";
                    setScrollEnabled(true);
                },
            });

            // Initial setup
            gsap.set(overlayRef.current, { willChange: "clip-path" });

            // Initial state for text: translated down (hidden by overflow)
            // Target the individual letters (spans) inside textRef
            if (textRef.current) {
                gsap.set(textRef.current.children, { y: "110%" });
            }

            // --- Animation Sequence ---

            // 1. Text Reveal (Staggered) - Starts immediately
            if (textRef.current) {
                tl.to(textRef.current.children, {
                    y: "0%",
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.2, // Stagger each letter by 0.2s
                }, 0.2);
            }

            // 2. Progress Bar: Non-linear "download" style - Starts with text
            // Fast start
            tl.to(progressRef.current, {
                scaleX: 0.3,
                duration: 0.5,
                ease: "power2.out",
            }, 0)
                // Stall/Pause
                .to(progressRef.current, {
                    scaleX: 0.35,
                    duration: 0.8, // Long pause
                    ease: "linear",
                })
                // Fast jump
                .to(progressRef.current, {
                    scaleX: 0.7,
                    duration: 0.4,
                    ease: "power3.inOut",
                })
                // Stall again
                .to(progressRef.current, {
                    scaleX: 0.75,
                    duration: 0.4,
                    ease: "linear",
                })
                // Finish
                .to(progressRef.current, {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                });


            // 3. Reveal Page (Overlay Slide Up)
            // No fade out for text/progress - they stay and get clipped by the overlay
            // as the overlay shrinks from bottom to top
            tl.to(overlayRef.current, {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 1.2,
                ease: "power4.inOut",
            });

            // Trigger text animation (onComplete) immediately after the slide starts
            // The slide is 1.2s. Triggering at -=1.1 means 0.1s after start.
            tl.call(() => onComplete?.(), undefined, "-=0.5");

        });

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 pointer-events-none"
            style={{ pointerEvents: skip ? "none" : "auto", display: skip ? "none" : undefined }}
        >
            {/* Dark Overlay Background */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black flex flex-col justify-between w-full h-full p-5"
                style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
                {/* Top Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-white/10">
                    <div
                        ref={progressRef}
                        className="h-full bg-white origin-left scale-x-0 w-full"
                    />
                </div>

                {/* Empty top content to push text to bottom */}
                <div></div>

                {/* Bottom Left Content: AAA Logo with Sliding Effect */}
                <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-col items-end gap-3 lg:flex-row">
                        <div
                            ref={textRef}
                            className="overflow-hidden flex text-white text-9xl lg:text-[15vw] leading-none font-bold tracking-tighter"
                        >
                            <span className="inline-block">A</span>
                            <span className="inline-block -ml-[0.05em]">A</span>
                            <span className="inline-block -ml-[0.05em]">A</span>
                        </div>
                        <p className="text-white text-sm font-semibold uppercase mb-5 max-w-[250px] lg:w-full">(Architecture + Interior Design Studio)</p>
                    </div>
                    <Loader2 className="animate-spin text-white size-5" />
                </div>
            </div>
        </div>
    );
}

export { Preloader };
