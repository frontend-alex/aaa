"use client";

import gsap from "gsap";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BigText, MediumText } from "@/components/components";

import { PROGRESS_STEPS } from "@/constants/data";

import Image from "next/image";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

function StickyCards() {
    const { t } = useTranslate();
    const containerRef = useRef<HTMLDivElement>(null);
    const triggersRef = useRef<ScrollTrigger[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const stickyCards = gsap.utils.toArray<HTMLElement>(".sticky-card", containerRef.current);

        stickyCards.forEach((card, index) => {
            if (index < stickyCards.length - 1) {
                const pinTrigger = ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                });
                triggersRef.current.push(pinTrigger);
            }

            if (index < stickyCards.length - 1) {
                const overlay = card.querySelector(".card-overlay");

                const animTrigger = ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale,
                            opacity: 1 - progress,
                        });

                        if (overlay) {
                            gsap.set(overlay, {
                                opacity: afterOpacity,
                            });
                        }
                    },
                });
                triggersRef.current.push(animTrigger);
            }
        });

        // After client-side navigation, layout isn't settled when useGSAP fires.
        // Double-rAF ensures we refresh after the browser has painted.
        let rafId = requestAnimationFrame(() => {
            rafId = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });

        return () => {
            cancelAnimationFrame(rafId);
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="p-0">
            {PROGRESS_STEPS.map((cardData, index) => (
                <div
                    className={`hidden lg:flex sticky-card relative w-full h-screen bg-background ${index > 0 ? "[box-shadow:0_-60px_60px_-60px_rgba(0,0,0,0.1)]" : ""
                        } flex will-change-transform
                     flex-col lg:flex-row lg:gap-12`}
                    key={index}
                >
                    <div
                        className="card-overlay absolute top-0 left-0 w-full h-full bg-background transition-opacity duration-100 pointer-events-none z-[2]"
                        style={{ opacity: 0 }}
                    />

                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10 mt-20">
                        <BigText className="font-bold px-5">
                            (0{cardData.index})
                        </BigText>
                    </div>
                    <div className="flex-[4] pt-6 relative z-10">
                        <div className="w-full flex flex-col gap-10">
                            <MediumText className="tracking-tighter lg:text-6xl xl:text-7xl font-bold uppercase">
                                {t(`process.steps.${cardData.id}.title` as any)}
                            </MediumText>


                            <Image
                                src="/images/gallery/image3.png"
                                className="h-[400px] max-w-[700px] bg-red-600 object-cover"
                                alt="section-2-1-image"
                                width={1920}
                                height={1080}
                            />
                            <p className="max-w-lg text-xl font-medium">
                                {t(`process.steps.${cardData.id}.desc` as any)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {PROGRESS_STEPS.map((cardData, index) => (
                <div
                    className={`lg:hidden relative p-5 w-full h-full bg-background flex will-change-transform flex-col gap-5 `}
                    key={index}
                >
                    <BigText className="font-bold">
                        (0{cardData.index})
                    </BigText>
                    <div className="flex flex-col gap-3">
                        <Image
                            src="/images/gallery/image3.png"
                            className="w-full h-[400px] bg-red-600 object-cover"
                            alt="section-2-1-image"
                            width={1920}
                            height={1080}
                        />
                        <MediumText className="tracking-tighter lg:text-6xl xl:text-7xl font-bold uppercase">
                            {t(`process.steps.${cardData.id}.title` as any)}
                        </MediumText>

                        <p className="max-w-lg text-xl font-medium">
                            {t(`process.steps.${cardData.id}.desc` as any)}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export { StickyCards };
