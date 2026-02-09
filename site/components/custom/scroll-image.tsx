'use client'

import gsap from "gsap"
import Image from "next/image"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

function ScrollImage({ src, alt, width, height, className }: ScrollRevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current) return;

        gsap.set(imageRef.current, {
            scale: 1.3,
            filter: "brightness(0.3)",
        });

        // Animate on scroll - zoom in to normal size
        gsap.to(imageRef.current, {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: 0.5,
                once: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className || ''}`}
        >
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto block"
                style={{
                    transformOrigin: "center center",
                    willChange: "transform, filter"
                }}
            />
        </div>
    );
}

export { ScrollImage };
