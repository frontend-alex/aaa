"use client";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from "@/components/custom/text/text";
import { MediumText, SmallText } from "@/components/components";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

function StudioLanding() {
    const { t } = useTranslate();

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
        <div ref={containerRef} className="flex flex-col lg:gap-10 justify-between">
            <div className="flex flex-col justify-end xl:h-1/3">
                <div
                    className="flex justify-between items-end gap-5"
                >
                    <Text delay={1.7}>
                        <MediumText className="hidden lg:block lg:text-4xl xl:text-5xl leading-[1.2] font-bold max-w-7xl">
                            {t("studio.desc")}
                        </MediumText>
                    </Text>
                    <Text delay={1.7}>
                        <SmallText className="uppercase">{t("studio.about")}</SmallText>
                    </Text>
                </div>

            </div>
            <header
                ref={headerRef}
                className="h-[200px] lg:h-[60dvh] relative">
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
            <Text delay={1.7}>
                <p className="lg:hidden text-xl font-medium mt-10">
                    {t("studio.desc")}
                </p>
            </Text>
        </div>
    )
}



export { StudioLanding }