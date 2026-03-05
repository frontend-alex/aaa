"use client";


"use client";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BigText, MediumText } from "@/components/components";
import { useTranslate } from "@/hooks/useTranslate";
import { PROGRESS_STEPS } from "@/constants/data";
import Image from "next/image";
import { Text } from "@/components/custom/text/text";

gsap.registerPlugin(ScrollTrigger);

function StickyCards() {
    const container = useRef<HTMLDivElement>(null);
    const { t } = useTranslate();

    useGSAP(
        () => {
            const stickyCards = document.querySelectorAll<HTMLDivElement>(".sticky-card");

            stickyCards.forEach((card: HTMLDivElement, index: number) => {
                if (index < stickyCards.length - 1) {
                    // Create the pin for the card
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: stickyCards[stickyCards.length - 1],
                        end: "top top",
                        pin: true,
                        pinSpacing: false,
                    });
                }

                if (index < stickyCards.length - 1) {
                    ScrollTrigger.create({
                        trigger: stickyCards[index + 1],
                        start: "top bottom",
                        end: "top top",
                        onUpdate: (self: ScrollTrigger) => {
                            const progress: number = self.progress;
                            const scale: number = 1 - progress * 0.05;
                            const afterOpacity: number = progress;

                            gsap.set(card, {
                                // scale: scale,
                                "--after-opacity": afterOpacity,
                            });
                        },
                    });
                }
            });
        },
        { scope: container }
    );

    return (
        <div className="relative w-full" ref={container}>
            {PROGRESS_STEPS.map((step, _index: number) => (
                <div
                    className="sticky-card relative w-full min-h-screen bg-background items-start p-6 flex pt-20 gap-12 will-change-transform
                        after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/50
                        after:opacity-[var(--after-opacity,0)] after:transition-opacity after:duration-100 after:ease-linear
                        after:pointer-events-none after:z-[2]
                        max-[1000px]:flex-col max-[1000px]:gap-0"
                    key={step.id}
                >
                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10 mt-20">
                        <BigText className="font-bold px-5">
                            (0{step.index})
                        </BigText>
                    </div>
                    <div className="flex-[4] pt-6 relative z-10">
                        <div className="w-full flex flex-col gap-10">
                            <MediumText className="tracking-tighter lg:text-6xl xl:text-7xl font-bold uppercase">
                                {t(`process.steps.${step.id}.title`)}
                            </MediumText>


                            <Image
                                src="/images/gallery/image3.png"
                                className="h-[400px] max-w-[700px] object-cover"
                                alt="section-2-1-image"
                                width={1920}
                                height={1080}
                            />
                            <Text>
                                <p className="max-w-lg text-xl font-medium">
                                    {t(`process.steps.${step.id}.desc`)}
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
}

export { StickyCards };
