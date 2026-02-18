"use client";

import { useRef, startTransition, useEffect, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

function TransitionPixel({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // Calculate columns based on a fixed block size (e.g. 50px)
    const blockSize = 50;
    const columns = Math.ceil(dimensions.width / blockSize);
    const rows = Math.ceil(dimensions.height / blockSize);
    const totalBlocks = columns * rows;

    return (
        <TransitionRouter
            auto={true}
            leave={(next, _from, _to) => {
                const blocks = containerRef.current?.querySelectorAll(".pixel-block");

                if (!blocks) {
                    next();
                    return;
                }

                gsap.set(blocks, { opacity: 1 });

                const tl = gsap.timeline({
                    onComplete: next,
                });

                // Animate blocks in random order
                tl.fromTo(blocks,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.05,
                        stagger: {
                            amount: 0.5,
                            from: "random",
                            grid: [rows, columns],
                        },
                    }
                );

                return () => {
                    tl.kill();
                };
            }}
            enter={(next) => {
                const blocks = containerRef.current?.querySelectorAll(".pixel-block");

                if (!blocks) {
                    startTransition(next);
                    return;
                }

                const tl = gsap.timeline();

                tl.to(blocks, {
                    opacity: 0,
                    duration: 0.05,
                    stagger: {
                        amount: 0.5,
                        from: "random",
                        grid: [rows, columns],
                    },
                })
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
                ref={containerRef}
                className="fixed inset-0 z-50 pointer-events-none flex flex-wrap"
                style={{ width: "100vw", height: "100vh" }}
            >
                {Array.from({ length: totalBlocks }).map((_, i) => (
                    <div
                        key={i}
                        className="pixel-block bg-black opacity-0"
                        style={{
                            width: `${100 / columns}vw`,
                            height: `${100 / rows}vh`
                        }}
                    />
                ))}
            </div>
        </TransitionRouter>
    );
}


export { TransitionPixel }