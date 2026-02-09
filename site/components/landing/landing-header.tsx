"use client";

import { gsap } from "gsap";
import { Button } from "@/custom/button";
import { Navbar } from "@/components/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useCallback } from "react";
import { RevealWrapper } from "@/custom/stagger-text";

gsap.registerPlugin(ScrollTrigger);

const BACKGROUND_IMAGES = [
    "/images/bg.png",
    "/images/bg2.png",
];

function LandingHeader() {
    const headerRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const bgDefaultRef = useRef<HTMLDivElement>(null);
    const bgHoverRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const headerTextContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = useCallback(() => {
        if (!bgDefaultRef.current || !bgHoverRef.current) return;

        timelineRef.current?.kill();

        timelineRef.current = gsap.timeline();
        timelineRef.current
            .to(bgHoverRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1.05,
                duration: 0.7,
                ease: "power4.inOut",
            }, 0)
            .to(bgDefaultRef.current, {
                scale: 1,
                duration: 0.7,
                ease: "power4.inOut",
            }, 0);
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!bgDefaultRef.current || !bgHoverRef.current) return;

        timelineRef.current?.kill();

        timelineRef.current = gsap.timeline();
        timelineRef.current
            .to(bgHoverRef.current, {
                clipPath: "inset(100% 0% 0% 0%)",
                scale: 1,
                duration: 0.7,
                ease: "power4.inOut",
            }, 0)
            .to(bgDefaultRef.current, {
                scale: 1,
                duration: 0.7,
                ease: "power4.inOut",
            }, 0);
    }, []);

    useEffect(() => {
        if (!overlayRef.current || !headerRef.current) return;

        gsap.to(overlayRef.current, {
            opacity: 0.6,
            scrollTrigger: {
                trigger: headerRef.current,
                start: "60% top",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            timelineRef.current?.kill();
        };
    }, []);

    return (
        <>
            {/* Navbar wrapper - Moved outside header for Safari stacking context fix */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar className="text-white p-5 navbar-root" />
            </div>

            <header
                ref={headerRef}
                className="relative min-h-screen w-full overflow-hidden"
            >
                {/* Default background image */}
                <div
                    ref={bgDefaultRef}
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `url('${BACKGROUND_IMAGES[0]}')`,
                        transformOrigin: "center center",
                        zIndex: 0,
                        willChange: "transform",
                    }}
                />

                {/* Hover background image (hidden by default via clip-path) */}
                <div
                    ref={bgHoverRef}
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `url('${BACKGROUND_IMAGES[1]}')`,
                        clipPath: "inset(0% 0% 100% 0%)",
                        transformOrigin: "center center",
                        zIndex: 1,
                        willChange: "clip-path, transform",
                    }}
                />

                {/* Dark overlay - z-2 */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black"
                    style={{ opacity: 0, zIndex: 2 }}
                />
            </header>

            {/* Fixed content - z-10 (behind next section, but visible over header bg) */}
            <div className="fixed flex flex-col justify-between h-[calc(100vh-300px)] w-full bottom-0 p-5 z-10">
                <div
                    className="flex items-center justify-between uppercase text-sm text-white font-semibold project-info"
                >
                    <RevealWrapper><p>summer villa</p></RevealWrapper>
                    <RevealWrapper><p>2021</p></RevealWrapper>
                    <RevealWrapper className="hidden lg:block"><p>featured project</p></RevealWrapper>

                    <RevealWrapper>
                        <Button
                            circleClassName="border-white group-hover:bg-white"
                            className="hover:text-white p-0 hover:bg-transparent"
                            circle
                            variant={"ghost"}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            View project
                        </Button>
                    </RevealWrapper>
                </div>

                <div className="flex flex-col lg:flex-row gap-2 lg:items-end justify-between" ref={headerTextContainerRef}>
                    <div className="text-xl max-w-[450px] lg:text-3xl text-white main-title">
                        <RevealWrapper>
                            The AAA Architecture style is defined by strong, solid forms with subtle elegance, natural balance and enduring appeal
                        </RevealWrapper>
                    </div>

                    <div className="small-text text-white">
                        <RevealWrapper>(scroll down)</RevealWrapper>
                    </div>
                </div>
            </div>
        </>
    );
}

export { LandingHeader };
