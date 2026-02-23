'use client'

import { useEffect, useMemo, useRef } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BaseText, BigText, Section, SmallText } from "@/components/components";

import { Text } from "@/custom/text/text";

import { ProjectProps } from "@/constants/data";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollImage } from "@/components/custom/scroll-image";
import { Link } from "@/components/custom/link";

import { groupImages, slugify } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SlidingText } from "@/components/custom/text/sliding-text";

import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

const PageClient = ({ project, nextProject }: { project: ProjectProps; nextProject: ProjectProps }) => {
    const { t } = useTranslate();

    const overlayRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const nextImageRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!nextImageRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: nextImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            animation: gsap.fromTo(nextImageRef.current, {
                scale: 1.15,
            }, {
                scale: 1,
                ease: "none",
            }),
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <main className="flex flex-col justify-between min-h-screen w-full">
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar logoVariant="light" className="text-white" />
            </div>

            <div ref={headerRef} className="min-h-[150dvh] w-full bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${project.src})` }}
            >
                <div
                    ref={overlayRef}
                    className="absolute min-h-[150dvh] w-full inset-0 bg-black"
                    style={{ opacity: 0.6 }}
                />

                <div className="absolute bottom-0 w-full h-[calc(100dvh-200px)]">
                    <div className="flex flex-col justify-between px-5 pb-5 h-full">
                        <Text animateOnScroll={false}>
                            <BigText className="text-5xl xl:text-[10vw]">
                                {project?.title.includes(' ')
                                    ? (() => {
                                        const translatedTitle = t(`project.title.${project.title}` as any) || project.title;
                                        const [first, ...rest] = translatedTitle.split(' ');
                                        const remainder = rest.join(' ');
                                        const startsWithNumber = rest[0] ? /^\d/.test(rest[0]) : false;
                                        return <>{first}{startsWithNumber ? ' ' : <br />}{remainder}</>;
                                    })()
                                    : t(`project.title.${project?.title}` as any) || project?.title
                                }
                            </BigText>
                        </Text>

                        <div className="flex justify-between items-center w-full">
                            <Text animateOnScroll={false} delay={0.2}>
                                <BaseText className="lg:text-lg uppercase">{t(`project.location.${project?.location}` as any) || project?.location}</BaseText>
                            </Text>
                            <Text animateOnScroll={false} delay={0.4}>
                                <BaseText className="lg:text-lg uppercase">{t(`project.title.${project?.year}` as any) || project?.year}</BaseText>
                            </Text>
                            <Text animateOnScroll={false} delay={0.6}>
                                <BaseText className="hidden lg:flex lg:text-lg uppercase">{t("project.scroll_explore")}</BaseText>
                            </Text>
                        </div>
                    </div>
                    <div className="flex h-full lg:mt-20 px-5">
                        <div className="w-full hidden sm:flex" />
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex justify-start">
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">{t("project.date_completed")}</BaseText>
                                    <BaseText className="lg:text-xl">{t(`project.title.${project?.year}` as any) || project?.year}</BaseText>
                                </div>
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">{t("project.project_type")}</BaseText>
                                    <BaseText className="lg:text-lg uppercase">{t(`project.category.${project?.category}` as any) || project?.category}</BaseText>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">{t("project.total_area")}</BaseText>
                                    <BaseText className="lg:text-xl">12 000 m²</BaseText>
                                </div>
                                <div className="flex flex-col gap-3 w-52">
                                    <BaseText className="lg:text-xl text-stone-400">{t("project.client")}</BaseText>
                                    <BaseText className="lg:text-lg uppercase">{t("project.private")}</BaseText>
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

            {/* Next Project */}
            <Link href={`/works/${slugify(nextProject.title)}`} className="block p-5">
                <section className="relative w-full h-[300px] lg:h-[500px] overflow-hidden cursor-pointer group">
                    <div
                        ref={nextImageRef}
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                        style={{
                            backgroundImage: `url(${nextProject.src})`,
                            willChange: "transform",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col gap-5 justify-between h-full p-5 text-white">
                        <SlidingText
                            hoverText={
                                <div className="hidden lg:flex items-center gap-2">
                                    <SmallText>{t(`project.title.${nextProject.title}` as any) || nextProject.title}</SmallText>
                                    <ArrowRight size={12} />
                                </div>
                            }
                            className="cursor-pointer"
                        >
                            <SmallText className="hidden lg:flex" link>{t("project.next")}</SmallText>
                        </SlidingText>

                        <div>
                            <Text>
                                <BigText>
                                    {t(`project.title.${nextProject.title}` as any) || nextProject.title}
                                </BigText>
                            </Text>
                            <div className="flex gap-8 mt-4">
                                <SmallText>{t(`project.category.${nextProject.category}` as any) || nextProject.category}</SmallText>
                                <SmallText>{t(`project.title.${nextProject.year}` as any) || nextProject.year}</SmallText>
                            </div>
                        </div>
                    </div>
                </section>
            </Link>

            <Footer />
        </main >
    )
}

export default PageClient
