'use client'

import gsap from "gsap"
import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, SplitText)

interface CopyProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
    paused?: boolean; // When true, animation waits until paused becomes false
}

function Copy({ children, animateOnScroll = true, delay = 0 }: CopyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLElement[]>([]);
    const splitRef = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        const elements: Element[] = Array.from(containerRef.current.children);

        elements.forEach((element) => {
            elementRef.current.push(element as HTMLElement);

            const split = SplitText.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "line++",
            });

            splitRef.current.push(split);

            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;

            if (textIndent && textIndent !== "0px") {
                if (split.lines.length > 0) {
                    (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
                }
                (element as HTMLElement).style.textIndent = "0";
            }

            lines.current.push(...(split.lines as HTMLElement[]));
        });

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay,
        }

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

        return () => {
            splitRef.current.forEach((split) => {
                if (split) {
                    split.revert();
                }
            });
        }


    },
        {
            scope: containerRef,
            dependencies: [animateOnScroll, delay]
        }
    );

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    )
}

export { Copy }