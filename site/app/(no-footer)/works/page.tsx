"use client";

import { useMemo, useCallback, useState } from "react";
import { projectsData } from "@/constants/data";
import { Text } from "@/custom/text/text";
import { BigText, Section, SmallText } from "@/components/components";
import { Navbar } from "@/components/Navbar";
import { ScrollImage } from "@/components/custom/scroll-image";
import { SlidingText } from "@/components/custom/text/sliding-text";
import { ArrowRight } from "lucide-react";
import { Link } from "next-transition-router";
import { SortSelect } from "@/components/custom/select/SortSelect";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

export default function WorksPage() {
    const [selectedCategory, setSelectedCategory] =
        useState<string>("All");

    const categories = useMemo(() => {
        const unique = new Set(projectsData.map(p => p.category));
        return ["All", ...unique];
    }, []);

    // Memoized filtering
    const filteredProjects = useMemo(() => {
        if (selectedCategory === "All") return projectsData;
        return projectsData.filter(
            (project) => project.category === selectedCategory
        );
    }, [selectedCategory]);

    const handleCategoryChange = useCallback((value: string) => {
        setSelectedCategory(value);
    }, [setSelectedCategory]);

    return (
        <main className="flex flex-col justify-between max-h-screen min-h-screen">
            <Navbar className="p-5 order-first" />

            <HorizontalScroll
                items={filteredProjects}
                className="pointer-events-auto hidden order-2 lg:flex items-top px-5"
                getItemKey={(item) => item.title}
                renderItem={(project, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-1 w-full cursor-pointer"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain h-[400px]" width={1000} height={1000} />
                        <SmallText>{project.title}</SmallText>
                    </div>
                )}
            />

            <Section className="grid grid-cols-1 md:grid-cols-2 lg:hidden flex-col gap-5 order-2">
                {filteredProjects.map((project, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-3 w-full h-full"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain w-full" width={1000} height={1000} />
                        <SmallText>{project.title}</SmallText>
                    </div>
                ))}
            </Section>

            <section className="order-first lg:order-last flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-end justify-between p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:items-start justify-between lg:justify-start gap-3">
                    <Text once delay={0.7} animateOnScroll={false}>
                        <BigText className="leading-[1.1] lg:text-4xl xl:text-6xl">
                            works
                        </BigText>
                    </Text>
                    <SortSelect
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    />
                </div>

                <Text once delay={0.9} animateOnScroll={false}>
                    <SmallText className="hidden lg:flex">
                        (Scroll)
                    </SmallText>
                </Text>

                <div className="flex flex-row justify-between items-center lg:items-start lg:flex-col">
                    <Link href="/archive" className="flex items-center gap-2">
                        <SlidingText
                            hoverText={
                                <div className="flex items-center gap-2">
                                    <SmallText>Archive</SmallText>
                                    <ArrowRight size={12} />
                                </div>
                            }
                            className="cursor-pointer"
                        >
                            <Text once delay={1.1} animateOnScroll={false}>
                                <SmallText>Archive</SmallText>
                            </Text>
                        </SlidingText>
                    </Link>

                    <Link href="/in-progress" className="flex items-center gap-2">
                        <SlidingText
                            hoverText={
                                <div className="flex items-center gap-2">
                                    <SmallText>In Progress</SmallText>
                                    <ArrowRight size={12} />
                                </div>
                            }
                            className="cursor-pointer"
                        >
                            <Text once delay={1.2} animateOnScroll={false}>
                                <SmallText>In Progress</SmallText>
                            </Text>
                        </SlidingText>
                    </Link>
                </div>
            </section>
        </main >
    );
}
