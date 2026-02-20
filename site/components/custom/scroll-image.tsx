'use client'

import gsap from "gsap"
import Image from "next/image"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    imageClassName?: string;
    scroller?: string | Element | null;
    horizontal?: boolean;
    /** Mark true for above-the-fold hero images to preload them */
    priority?: boolean;
    /** Responsive sizes hint, e.g. "100vw" for full-width heroes */
    sizes?: string;
}

function ScrollImage({
    src, alt, width, height,
    className, imageClassName,
    scroller, horizontal = false,
    priority = false, sizes,
}: ScrollRevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);      // wraps the image for transform
    const overlayRef = useRef<HTMLDivElement>(null);     // brightness replacement
    const triggersRef = useRef<ScrollTrigger[]>([]);     // track our own triggers

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current || !overlayRef.current) return;

        // --- Initial state ---
        gsap.set(imageRef.current, {
            scale: 1.3,
            force3D: true,          // GPU layer
        });
        gsap.set(overlayRef.current, {
            opacity: 0.7,           // dark overlay replaces brightness(0.3)
        });

        // --- Reveal animation (scale + brighten) ---
        const revealTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            scroller: scroller || undefined,
            horizontal: horizontal,
            start: horizontal ? "left 80%" : "top 80%",
            end: horizontal ? "left 40%" : "top 40%",
            scrub: 0.6,
            once: true,
            animation: gsap.timeline()
                .to(imageRef.current, {
                    scale: 1,
                    force3D: true,
                    ease: "power2.out",
                }, 0)
                .to(overlayRef.current, {
                    opacity: 0,
                    ease: "power2.out",
                }, 0),
        });

        // --- Parallax (transform only — GPU composited) ---
        const parallaxFrom = horizontal ? { xPercent: -7 } : { yPercent: -7 };
        const parallaxTo = horizontal ? { xPercent: 7 } : { yPercent: 7 };

        const parallaxTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            scroller: scroller || undefined,
            horizontal: horizontal,
            start: horizontal ? "left right" : "top bottom",
            end: horizontal ? "right left" : "bottom top",
            scrub: 0.8,             // smoothed lerp instead of 1:1
            animation: gsap.fromTo(imageRef.current,
                { ...parallaxFrom, force3D: true },
                { ...parallaxTo, force3D: true, ease: "none" },
            ),
        });

        triggersRef.current = [revealTrigger, parallaxTrigger];

        return () => {
            triggersRef.current.forEach(t => t.kill());
            triggersRef.current = [];
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden relative ${className || ''}`}
        >
            {/* Transform wrapper — only this div gets animated */}
            <div
                ref={imageRef}
                className="w-full h-full"
                style={{
                    transformOrigin: "center center",
                    willChange: "transform",
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    sizes={sizes}
                    className={`w-full h-full object-cover ${imageClassName || ''}`}
                    onLoad={() => {
                        // Only refresh our own triggers, not every trigger on the page
                        triggersRef.current.forEach(t => t.refresh());
                    }}
                />
            </div>

            {/* Dark overlay — replaces filter: brightness()
                opacity is GPU-composited, so animating it is ~free */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ willChange: "opacity" }}
            />
        </div>
    );
}

export { ScrollImage };
