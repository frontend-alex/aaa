"use client";

import { useRef, startTransition } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

function TransitionSlide({ children }: { children: React.ReactNode }) {
    const firstLayer = useRef<HTMLDivElement | null>(null);
    const secondLayer = useRef<HTMLDivElement | null>(null);

    return (
        <TransitionRouter
            auto={true}
            leave={(next, _from, _to) => {
                window.scrollTo(0, 0);
                const tl = gsap
                    .timeline({
                        onComplete: next,
                    })
                    .fromTo(
                        firstLayer.current,
                        { y: "100%" },
                        {
                            y: 0,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                    )
                    .fromTo(
                        secondLayer.current,
                        {
                            y: "100%",
                        },
                        {
                            y: 0,
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                        "<50%",
                    );

                return () => {
                    tl.kill();
                };
            }}
            enter={(next) => {
                window.scrollTo(0, 0);
                const tl = gsap
                    .timeline()
                    .fromTo(
                        secondLayer.current,
                        { y: 0 },
                        {
                            y: "-100%",
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                    )
                    .fromTo(
                        firstLayer.current,
                        { y: 0 },
                        {
                            y: "-100%",
                            duration: 0.5,
                            ease: "circ.inOut",
                        },
                        "<50%",
                    )
                    .call(() => {
                        requestAnimationFrame(() => {
                            startTransition(next);
                        });
                    }, undefined, "<50%");

                return () => {
                    tl.kill();
                };
            }}
        >
            <main>{children}</main>

            <div
                ref={firstLayer}
                className="fixed inset-0 z-50 translate-y-full bg-primary"
            />
            <div
                ref={secondLayer}
                className="fixed inset-0 z-50 translate-y-full bg-foreground"
            />
        </TransitionRouter>
    );
}

export { TransitionSlide }