"use client";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from "@/components/custom/text/text";
import { MediumText, SmallText } from "@/components/components";

gsap.registerPlugin(ScrollTrigger);

function StudioLanding() {

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !headerRef.current || !overlayRef.current || !bgImageRef.current) return;

        gsap.set(bgImageRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });



        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(bgImageRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.8,
            ease: "power4.inOut",
        });


        // --- Scroll-driven overlay darkening ---
        const overlayTrigger = ScrollTrigger.create({
            trigger: headerRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(overlayRef.current, {
                opacity: 0.6,
            }),
        });

        return () => {
            tl.kill();
            overlayTrigger.kill();
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col lg:gap-10 xl:h-screen bg-white">
            <div className="flex flex-col justify-end xl:h-1/3">
                <div
                    className="flex flex-col gap-5"
                >
                    <Text delay={1.7}>
                        <SmallText className="uppercase">(About us)</SmallText>
                    </Text>
                    <Text delay={1.7}>
                        <MediumText className="lg:text-4xl xl:text-5xl leading-[1.2] font-bold max-w-7xl">
                            In their work, A&A Architects strive to create a strong link between theory and practice, expressed in the search for an optimal balance between aesthetic, functional, economic and environmental characteristics of each building designed by the studio.
                        </MediumText>
                    </Text>
                </div>

            </div>
            <header
                ref={headerRef}
                className="h-[150px] lg:h-2/3 relative">
                <div
                    ref={bgImageRef}
                    className="h-full bg-[url('/images/studio/bg.jpg')] bg-contain lg:bg-cover bg-no-repeat bg-white bg-bottom"
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black"
                    style={{ opacity: 0, zIndex: 2 }}
                />
            </header>
        </div>
    )
}



export { StudioLanding }