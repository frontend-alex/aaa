import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from "@/components/custom/text/text";
import { MediumText, SmallText } from "@/components/components";

import gsap from "gsap";
import Image from "next/image";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

function ProcessHeading() {
    const { t } = useTranslate();

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);

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
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-3 lg:gap-10">
            <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                <Text>
                    <SmallText>
                        {t("process.heading.subtitle")}
                    </SmallText>
                </Text>
            </div>
            <div ref={headerRef} className="flex-[4] flex flex-col gap-10 relative z-10">
                <Text delay={0.5}>
                    <MediumText className="xl:text-7xl font-bold">
                        {t("process.heading.title")}
                    </MediumText>
                </Text>
                <Image
                    ref={bgImageRef}
                    src="/images/process/1.jpg"
                    alt="section-2-1-image"
                    width={1920}
                    height={1080}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black"
                    style={{ opacity: 0, zIndex: 2 }}
                />
            </div>
        </div>
    )
}

export { ProcessHeading }