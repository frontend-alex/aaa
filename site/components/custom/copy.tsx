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
    const containerRef = useRef<HTMLElement | null>(null);
    const elementRefs = useRef<HTMLElement[]>([]);
    const splitRefs = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            splitRefs.current = [];
            lines.current = [];
            elementRefs.current = [];

            let elements: Element[] = [];
            if (containerRef.current.hasAttribute("data-copy-wrapper")) {
                elements = Array.from(containerRef.current.children);
            } else {
                elements = [containerRef.current];
            }

            elements.forEach((element) => {
                elementRefs.current.push(element as HTMLElement);

                const split = SplitText.create(element as HTMLElement, {
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
                    (element as HTMLElement).style.textIndent = "0";
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

            return () => {
                splitRefs.current.forEach((split) => {
                    if (split) {
                        split.revert();
                    }
                });
            };
        },
        { scope: containerRef, dependencies: [animateOnScroll, delay] }
    );

    if (React.Children.count(children) === 1) {
        return React.cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, { ref: containerRef });
    }

    return (
        <div ref={containerRef as React.RefObject<HTMLDivElement>} data-copy-wrapper="true">
            {children}
        </div>
    );
}

export { Copy }