"use client";

import { projectsData } from "@/constants/data";
import { Text } from "@/custom/text/text";
import { BigText, Section, SmallText } from "@/components/components";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { Navbar } from "@/components/Navbar";
import { ScrollImage } from "@/components/custom/scroll-image";
import { SlidingText } from "@/components/custom/text/sliding-text";
import { ArrowRight } from "lucide-react";
import { Link } from "next-transition-router";

export default function InProgressPage() {
    return (
        <main className="flex flex-col justify-between max-h-screen min-h-screen">
            <Navbar className="p-5" />

            <Text delay={0.5} animateOnScroll={false}>
                <InfiniteScroll
                    items={projectsData}
                    className="pointer-events-auto hidden lg:flex"
                    renderItem={(project, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-1 w-full md:w-[45vw] lg:w-[30vw] shrink-0 h-full cursor-pointer"
                        >
                            <ScrollImage src={project.src} alt={project.title} className="object-contain w-full max-h-[500px]" width={1000} height={1000} />
                            <SmallText>{project.title}</SmallText>
                        </div>
                    )}
                />
            </Text>

            <Section className="flex lg:hidden flex-col gap-5">
                {projectsData.map((project, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-3 w-full md:w-[45vw] lg:w-[30vw] shrink-0 h-full"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain w-full" width={1000} height={1000} />
                        <SmallText>{project.title}</SmallText>
                    </div>
                ))}
            </Section>

            <section className="hidden lg:flex items-end justify-between p-5">
                <Text delay={0.7} animateOnScroll={false}>
                    <BigText className="leading-[1.1] lg:text-4xl xl:text-6xl">
                        in progress
                    </BigText>
                </Text>
                <Text delay={0.9} animateOnScroll={false}>
                    <SmallText>
                        (Scroll)
                    </SmallText>
                </Text>
                <div className="flex flex-col">
                    <SlidingText
                        hoverText={
                            <Link href="/archive" className="flex items-center gap-2">
                                <SmallText>Archive</SmallText>
                                <ArrowRight size={12} />
                            </Link>
                        }
                        className="cursor-pointer"
                    >
                        <Text delay={1.1} animateOnScroll={false}>
                            <SmallText>Archive </SmallText>
                        </Text>
                    </SlidingText>
                    <SlidingText
                        hoverText={
                            <Link href="/works" className="flex items-center gap-2">
                                <SmallText>Works</SmallText>
                                <ArrowRight size={12} />
                            </Link>
                        }
                        className="cursor-pointer"
                    >
                        <Text delay={1.2} animateOnScroll={false}>
                            <SmallText>Works </SmallText>
                        </Text>
                    </SlidingText>
                </div>
            </section>
        </main >
    );
}
