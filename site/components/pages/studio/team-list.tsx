"use client";

import gsap from "gsap";
import Image from "next/image";
import { slugify } from "@/lib/utils";
import { TEAM } from "@/constants/data";
import { Link } from "@/components/custom/link";
import { useTranslate } from "@/hooks/useTranslate";
import { useRef, useState, useCallback } from "react";
import { MediumText, SmallText } from "@/components/components";

function TeamList() {
    const { t } = useTranslate();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const getYForRow = useCallback((index: number) => {
        if (!imageRef.current || !containerRef.current) return 0;
        const row = rowRefs.current[index];
        if (!row) return 0;
        const containerRect = containerRef.current.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const imageHeight = imageRef.current.offsetHeight;
        return rowRect.top - containerRect.top + rowRect.height - imageHeight;
    }, []);

    const animateImage = useCallback((index: number) => {
        if (!imageRef.current || !containerRef.current) return;

        gsap.to(imageRef.current, {
            y: getYForRow(index),
            xPercent: -50,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
        });
    }, [getYForRow]);

    const handleMouseEnter = useCallback((index: number) => {
        setActiveIndex(index);
        animateImage(index);

        if (containerRef.current) {
            const rows = containerRef.current.querySelectorAll(".team-row");
            rows.forEach((row, i) => {
                gsap.to(row, {
                    opacity: i === index ? 1 : 0.3,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        }
    }, [animateImage]);

    const handleContainerLeave = useCallback(() => {
        setActiveIndex(0);

        if (imageRef.current && rowRefs.current[0] && containerRef.current) {
            gsap.to(imageRef.current, {
                y: getYForRow(0),
                xPercent: -50,
                duration: 0.5,
                ease: "power3.out",
                overwrite: true,
            });
        }

        if (containerRef.current) {
            const rows = containerRef.current.querySelectorAll(".team-row");
            rows.forEach((row) => {
                gsap.to(row, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        }
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="hidden lg:flex flex-col justify-center items-center relative mt-30 relative"
                onMouseLeave={handleContainerLeave}
            >
                {/* Floating image that follows the hovered row */}
                <div
                    ref={imageRef}
                    className="pointer-events-none absolute right-0 top-5 z-10 w-[200px] h-[260px] lg:w-[250px] lg:h-[320px] overflow-hidden"

                >
                    {TEAM.map((member, index) => (
                        <Image
                            key={member.name}
                            src={member.image}
                            alt={member.name}
                            width={300}
                            height={400}
                            className="absolute top-0 inset-0 w-full h-full object-cover transition-opacity duration-300"
                            style={{ opacity: activeIndex === index ? 1 : 0 }}
                        />
                    ))}
                </div>

                {/* Team rows */}
                {TEAM.map((member, index) => (
                    <Link
                        href={`/studio/${slugify(member.name)}`}
                        key={member.name}
                        ref={(el) => { rowRefs.current[index] = el; }}
                        className="team-row w-full cursor-pointer py-2"
                        style={{ opacity: activeIndex === index ? 1 : 0.3 }}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <div className="flex justify-center items-center gap-5 w-full">
                            <SmallText className="uppercase">{t(`team.position.${member.position}` as any)}</SmallText>
                            <MediumText className="uppercase font-bold xl:text-6xl">{t(`team.name.${member.name}` as any) || member.name}</MediumText>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="lg:hidden grid grid-cols-2 gap-5">
                {TEAM.map((member) => (
                    <Link href={`/studio/${member.name}`} key={member.name} className="flex flex-col gap-2">
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover shadow-2xl"
                        />
                        <MediumText className="uppercase">{t(`team.name.${member.name}` as any) || member.name}</MediumText>
                        <SmallText className="uppercase -mt-2">{t(`team.position.${member.position}` as any)}</SmallText>
                    </Link>
                ))}
            </div>
        </>
    );
}

export { TeamList };
