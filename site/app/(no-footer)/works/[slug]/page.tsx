'use client'

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollImage } from "@/components/custom/scroll-image";
import { BigText } from "@/components/components";

gsap.registerPlugin(ScrollTrigger);

export default function Works({ params }: { params: { slug: string } }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!overlayRef.current || !headerRef.current) return;

        const overlayTrigger = ScrollTrigger.create({
            trigger: headerRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(overlayRef.current, {
                opacity: 0.8,
            }),
        });

        return () => {
            overlayTrigger.kill();
            timelineRef.current?.kill();
        };
    }, []);

    return (
        <main className="flex flex-col justify-between min-h-screen w-full">
            <Navbar logoVariant="light" className="p-5 text-white z-50" />
            <div className="min-h-[150dvh] w-full">
                {/* Background Layer */}
                <div className="absolute top-0 w-full z-10">
                    <ScrollImage
                        src="/images/gallery/image3.png"
                        alt=""
                        className="w-full h-full"
                        width={1920}
                        height={1080}
                    />
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 bg-black"
                        style={{ opacity: 0.5, zIndex: 20 }}
                    />
                </div>

                {/* Content Layer */}
                <div className="relative z-30 h-[calc(100dvh-300px)] flex flex-col justify-between items-start">
                    <BigText>Heading</BigText>

                    <div className="flex justify-between items-center w-full">
                        <p>Summer Villa</p>
                        <p>2021</p>
                        <p>Featured Project</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main >
    )
}