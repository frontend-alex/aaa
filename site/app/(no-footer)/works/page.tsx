"use client";

import { BigText, Section, SmallText } from "@/components/components";
import { ScrollImage } from "@/components/custom/scroll-image";
import { SortSelect } from "@/components/custom/select/SortSelect";
import { SlidingText } from "@/components/custom/text/sliding-text";
import { Navbar } from "@/components/Navbar";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { projectsData } from "@/constants/data";
import { slugify } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "next-transition-router";
import { useCallback, useMemo, useState } from "react";

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
        <main className="flex flex-col justify-between lg:max-h-screen min-h-screen">
            <Navbar className="order-first" />

            <HorizontalScroll
                items={filteredProjects}
                className="pointer-events-auto hidden order-2 lg:flex items-top px-5"
                getItemKey={(item) => item.title}
                renderItem={(project, i) => (
                    <Link
                        href={`/works/${slugify(project.title)}`}
                        key={i}
                        className="flex flex-col gap-1 w-full cursor-pointer"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain h-[400px]" width={1000} height={1000} />
                        <SmallText>{project.title}</SmallText>
                    </Link>
                )}
            />

            <Section className="grid grid-cols-1 md:grid-cols-2 lg:hidden flex-col gap-5 order-2">
                {filteredProjects.map((project, i) => (
                    <Link
                        href={`/works/${slugify(project.title)}`}
                        key={i}
                        className="flex flex-col gap-3 w-full h-full"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain w-full" width={1000} height={1000} />
                        <SmallText>{project.title}</SmallText>
                    </Link>
                ))}
            </Section>

            <motion.section
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                    opacity: { duration: 0.5 }
                }}
                className="order-first lg:order-last flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-end justify-between p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:items-start justify-between lg:justify-start gap-1 lg:gap-3">
                    <BigText className="leading-[0.6] lg:text-4xl xl:text-6xl">
                        works
                    </BigText>
                    <SortSelect
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    />
                </div>

                <SmallText className="hidden lg:flex">
                    (Scroll)
                </SmallText>

                <div
                    className="flex flex-row justify-between items-center lg:items-start lg:flex-col">
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
                            <SmallText link>Archive</SmallText>
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
                            <SmallText link>In Progress</SmallText>
                        </SlidingText>
                    </Link>
                </div>
            </motion.section>
        </main  >
    );
}
