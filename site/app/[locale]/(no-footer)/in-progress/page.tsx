"use client";

import { BigText, Section, SmallText } from "@/components/components";
import { Navbar } from "@/components/Navbar";
import { ScrollImage } from "@/components/custom/scroll-image";
import { SlidingText } from "@/components/custom/text/sliding-text";
import { projectsData } from "@/constants/data";
import { slugify } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/components/custom/link";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { useTranslate } from "@/hooks/useTranslate";

export default function InProgressPage() {
    const { t } = useTranslate();
    return (
        <main
            className="flex flex-col justify-between lg:max-h-screen min-h-screen"
        >
            <Navbar className="order-first" />

            <HorizontalScroll
                items={projectsData}
                className="pointer-events-auto hidden order-2 lg:flex items-top px-5"
                getItemKey={(item) => item.title}
                renderItem={(project, i) => (
                    <Link
                        href={`/works/${slugify(project.title)}`}
                        key={i}
                        className="flex flex-col gap-1 w-full cursor-pointer"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain h-[400px]" width={1000} height={1000} />
                        <SmallText>{t(`project.title.${project.title}` as any) || project.title}</SmallText>
                    </Link>
                )}
            />

            <Section className="grid grid-cols-1 md:grid-cols-2 lg:hidden flex-col gap-5 order-2">
                {projectsData.map((project, i) => (
                    <Link
                        href={`/works/${slugify(project.title)}`}
                        key={i}
                        className="flex flex-col gap-3 w-full h-full"
                    >
                        <ScrollImage src={project.src} alt={project.title} className="object-contain w-full" width={1000} height={1000} />
                        <SmallText>{t(`project.title.${project.title}` as any) || project.title}</SmallText>
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
                <BigText className="leading-[1.1] lg:text-4xl xl:text-6xl">
                    in progress
                </BigText>

                <SmallText className="hidden lg:flex">
                    (Scroll)
                </SmallText>

                <div className="flex flex-row justify-between items-center lg:items-start lg:flex-col">
                    <Link href="/works" className="flex items-center gap-2">
                        <SlidingText
                            hoverText={
                                <div className="flex items-center gap-2">
                                    <SmallText>{t("works.title")}</SmallText>
                                    <ArrowRight size={12} />
                                </div>
                            }
                            className="cursor-pointer"
                        >
                            <SmallText link>{t("works.title")}</SmallText>
                        </SlidingText>
                    </Link>

                    <Link href="/archive" className="flex items-center gap-2">
                        <SlidingText
                            hoverText={
                                <div className="flex items-center gap-2">
                                    <SmallText>{t("works.archive")}</SmallText>
                                    <ArrowRight size={12} />
                                </div>
                            }
                            className="cursor-pointer"
                        >
                            <SmallText link>{t("works.archive")}</SmallText>
                        </SlidingText>
                    </Link>
                </div>
            </motion.section>
        </main >
    );
}
