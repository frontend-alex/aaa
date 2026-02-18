"use client";

import { useRef, startTransition } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

function TransitionFade({ children }: { children: React.ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        <TransitionRouter
            auto={true}
            leave={(next, _from, _to) => {
                const tl = gsap.timeline({
                    onComplete: next,
                });

                tl.to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                });

                return () => {
                    tl.kill();
                };
            }}
            enter={(next) => {
                const tl = gsap.timeline();

                tl.fromTo(
                    wrapperRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.inOut",
                    }
                ).call(() => {
                    requestAnimationFrame(() => {
                        startTransition(next);
                    });
                }, undefined, "<50%");

                return () => {
                    tl.kill();
                };
            }}
        >
            <div className="fixed inset-0 bg-black -z-50" />
            <div ref={wrapperRef} className="w-full h-full opacity-100 bg-background">
                {children}
            </div>
        </TransitionRouter>
    );
}


export { TransitionFade }