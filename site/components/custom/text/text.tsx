"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(SplitText, ScrollTrigger);

type CopyProps = {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
}

function Text({ children, animateOnScroll = true, delay = 0 }: CopyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const splitRefs = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);
    const hasAnimated = useRef(false);
    const triggerRef = useRef<ScrollTrigger | null>(null);

    const { language } = useTranslate();

    useGSAP(
        () => {
            if (!containerRef.current) return;

            let isCancelled = false;
            hasAnimated.current = false;
            splitRefs.current = [];
            lines.current = [];

            const runSplit = () => {
                // Kill any previous ScrollTrigger we created
                if (triggerRef.current) {
                    triggerRef.current.kill();
                    triggerRef.current = null;
                }

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

                // If animation already played, keep text visible
                if (hasAnimated.current) {
                    gsap.set(lines.current, { y: "0%" });
                    return;
                }

                gsap.set(lines.current, { y: "100%" });

                const animationProps = {
                    y: "0%",
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: delay,
                    onComplete: () => {
                        hasAnimated.current = true;
                    },
                };

                if (animateOnScroll) {
                    const tween = gsap.to(lines.current, {
                        ...animationProps,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    });
                    triggerRef.current = tween.scrollTrigger || null;
                } else {
                    gsap.to(lines.current, animationProps);
                }
            };

            const init = () => {
                if (isCancelled) return;
                splitRefs.current.forEach(s => s.revert());
                splitRefs.current = [];
                lines.current = [];
                runSplit();
            };

            // Wait for fonts to load before splitting
            document.fonts.ready.then(() => {
                if (!isCancelled) init();
            });

            // Only re-split on actual container resize (not on image loads)
            let resizeTimer: ReturnType<typeof setTimeout>;
            const ro = new ResizeObserver(() => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (!isCancelled) init();
                }, 200);
            });
            ro.observe(containerRef.current);

            return () => {
                isCancelled = true;
                clearTimeout(resizeTimer);
                ro.disconnect();
                triggerRef.current?.kill();
                splitRefs.current.forEach((split) => {
                    if (split) {
                        split.revert();
                    }
                });
            };
        },
        { scope: containerRef, dependencies: [animateOnScroll, delay, language] }
    );

    return (
        <div ref={containerRef} key={language} data-copy-wrapper="true">
            {children}
        </div>
    );
}

export { Text }
