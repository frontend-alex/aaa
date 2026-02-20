'use client'

import { useEffect, useMemo, useRef } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BaseText, BigText, Section } from "@/components/components";

import { Text } from "@/custom/text/text";

import { ProjectProps } from "@/constants/data";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollImage } from "@/components/custom/scroll-image";

import { groupImages } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PageClient = ({ project }: { project: ProjectProps }) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const imageGroups = useMemo(
        () => groupImages(project.images, project.title),
        [project.images, project.title]
    );

    useEffect(() => {
        if (!overlayRef.current || !headerRef.current) return;

        const overlayTrigger = ScrollTrigger.create({
            trigger: headerRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(overlayRef.current, {
                opacity: 1,
            }),
        });

        return () => {
            overlayTrigger.kill();
            timelineRef.current?.kill();
        };
    }, []);

    return (
        <main className="flex flex-col justify-between min-h-screen w-full">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar logoVariant="light" className="p-5 text-white" />
            </div>

            <div ref={headerRef} className="min-h-[150dvh] w-full bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${project.src})` }}
            >
                <div
                    ref={overlayRef}
                    className="absolute min-h-[150dvh] w-full inset-0 bg-black"
                    style={{ opacity: 0.6 }}
                />

                <div className="absolute bottom-0 w-full h-1/2">
                    <div className="flex flex-col justify-between px-5 pb-5 h-full">
                        <Text animateOnScroll={false}>
                            <BigText className="text-5xl xl:text-[10vw]">
                                {project?.title.includes(' ')
                                    ? <>{project.title.split(' ')[0]}<br />{project.title.split(' ').slice(1).join(' ')}</>
                                    : project?.title
                                }
                            </BigText>
                        </Text>

                        <div className="flex justify-between items-center w-full">
                            <Text animateOnScroll={false} delay={0.2}>
                                <BaseText className="lg:text-lg uppercase">{project?.location}</BaseText>
                            </Text>
                            <Text animateOnScroll={false} delay={0.4}>
                                <BaseText className="lg:text-lg uppercase">{project?.year}</BaseText>
                            </Text>
                            <Text animateOnScroll={false} delay={0.6}>
                                <BaseText className="lg:text-lg uppercase">(scroll to explore)</BaseText>
                            </Text>
                        </div>
                    </div>
                    <div className="flex h-full lg:mt-20 px-5">
                        <div className="w-full hidden sm:flex" />
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex justify-start">
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">Date Completed</BaseText>
                                    <BaseText className="lg:text-xl">{project?.year}</BaseText>
                                </div>
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">Project Type</BaseText>
                                    <BaseText className="lg:text-lg uppercase">{project?.category}</BaseText>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">Total built area</BaseText>
                                    <BaseText className="lg:text-xl">12 000 m²</BaseText>
                                </div>
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">Client</BaseText>
                                    <BaseText className="lg:text-lg uppercase">Private</BaseText>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Section className="min-h-0">
                {imageGroups.map((group, idx) =>
                    group.length === 2 ? (
                        <div key={idx} className="flex flex-col lg:flex-row gap-4">
                            {group.map((image, j) => (
                                <ScrollImage
                                    key={j}
                                    height={1080}
                                    width={1920}
                                    src={image}
                                    alt="Project Image"
                                    className="w-full lg:w-1/2 object-contain"
                                />
                            ))}
                        </div>
                    ) : (
                        <ScrollImage
                            key={idx}
                            height={1080}
                            width={1920}
                            src={group[0]}
                            alt="Project Image"
                            className="w-full object-contain"
                        />
                    )
                )}
            </Section>

            <Footer />
        </main >
    )
}

export default PageClient