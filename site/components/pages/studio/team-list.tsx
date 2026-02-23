"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { MediumText, SmallText } from "@/components/components";
import { TEAM } from "@/constants/data";
import { Link } from "@/components/custom/link";
import { useTranslate } from "@/hooks/useTranslate";

// Pre-generate a unique rotation for each team member
const ROTATIONS = TEAM.map((_, i) => {
    const angles = [-8, 5, -4, 7, -6, 3, -5, 8, -3, 6, -7];
    return angles[i % angles.length];
});

function TeamList() {
    const { t } = useTranslate();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0); // default to first member

    const getYForRow = useCallback((index: number) => {
        if (!imageRef.current || !containerRef.current) return 0;
        const row = rowRefs.current[index];
        if (!row) return 0;
        const containerRect = containerRef.current.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const imageHeight = imageRef.current.offsetHeight;
        // Bottom of image = bottom of row
        return rowRect.top - containerRect.top + rowRect.height - imageHeight;
    }, []);

    const animateImage = useCallback((index: number) => {
        if (!imageRef.current || !containerRef.current) return;

        gsap.to(imageRef.current, {
            y: getYForRow(index),
            xPercent: -50,
            // rotation: ROTATIONS[index],
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

        // Dim non-active rows
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

        // Animate back to first row position
        if (imageRef.current && rowRefs.current[0] && containerRef.current) {
            gsap.to(imageRef.current, {
                y: getYForRow(0),
                xPercent: -50,
                // rotation: ROTATIONS[0],
                duration: 0.5,
                ease: "power3.out",
                overwrite: true,
            });
        }

        // Reset all rows to full opacity
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
                        href={`/studio/${member.name}`}
                        key={member.name}
                        ref={(el) => { rowRefs.current[index] = el; }}
                        className="team-row w-full cursor-pointer py-4"
                        style={{ opacity: activeIndex === index ? 1 : 0.3 }}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <div className="flex justify-center items-center gap-5 w-full">
                            <MediumText className="uppercase font-bold">{t(`team.name.${member.name}` as any) || member.name}</MediumText>
                            <SmallText className="uppercase">{t(`team.position.${member.position}` as any)}</SmallText>
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
