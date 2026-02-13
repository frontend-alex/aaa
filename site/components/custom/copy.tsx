"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type CopyProps = {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
}

function Copy({ children, animateOnScroll = true, delay = 0 }: CopyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const splitRefs = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            splitRefs.current = [];
            lines.current = [];

            const runSplit = () => {
                const elements = Array.from(containerRef.current!.children) as HTMLElement[];

                elements.forEach((element) => {
                    const split = SplitText.create(element, {
                        type: "lines",
                        mask: "lines",
                        linesClass: "line++",
                        lineThreshold: 0.1,
                    });

                    splitRefs.current.push(split);

                    const computedStyle = window.getComputedStyle(element);
                    const textIndent = computedStyle.textIndent;

                    if (textIndent && textIndent !== "0px") {
                        if (split.lines.length > 0) {
                            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
                        }
                        element.style.textIndent = "0";
                    }

                    lines.current.push(...split.lines as HTMLElement[]);
                });

                gsap.set(lines.current, { y: "100%" });

                const animationProps = {
                    y: "0%",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: delay,
                };

                if (animateOnScroll) {
                    gsap.to(lines.current, {
                        ...animationProps,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    });
                } else {
                    gsap.to(lines.current, animationProps);
                }
            };

            const init = () => {
                splitRefs.current.forEach(s => s.revert());
                splitRefs.current = [];
                lines.current = [];
                runSplit();
            };

            // Wait for fonts to load before splitting
            document.fonts.ready.then(() => {
                init();
            });


            // Handle Resize / Refresh: Revert splits to allow natural reflow, then re-split
            const onRefreshInit = () => {
                splitRefs.current.forEach(s => s.revert());
            };

            const onRefresh = () => {
                // We need to rebuild the split and animation
                // But since runSplit creates the animation/ScrollTrigger, we should be careful.
                // Simpler approach for now: Just revert. ScrollTrigger.refresh() will re-calculate positions.
                // But SplitText needs to re-split.
                // Let's just handle this via a dedicated resize listener or trust ScrollTrigger's "invalidateOnRefresh" if we were using it.
                // Actually, standard pattern is: revert on refreshInit, split on refresh.
                splitRefs.current = [];
                lines.current = [];
                runSplit();
            };

            ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
            ScrollTrigger.addEventListener("refresh", onRefresh);

            return () => {
                ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
                ScrollTrigger.removeEventListener("refresh", onRefresh);
                splitRefs.current.forEach((split) => {
                    if (split) {
                        split.revert();
                    }
                });
            };
        },
        { scope: containerRef, dependencies: [animateOnScroll, delay] }
    );

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );
}

export { Copy }