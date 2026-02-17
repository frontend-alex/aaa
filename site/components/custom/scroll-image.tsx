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
    imageClassName?: string;
    scroller?: string | Element | null;
    horizontal?: boolean;
}

function ScrollImage({ src, alt, width, height, className, imageClassName, scroller, horizontal = false }: ScrollRevealImageProps) {
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
                scroller: scroller || window,
                horizontal: horizontal,
                start: horizontal ? "left 80%" : "top 80%",
                end: horizontal ? "left 40%" : "top 40%",
                scrub: 0.5,
                once: true,
            },
        });

        // Subtle parallax — image drifts vertically within the overflow-hidden container
        const parallaxProps = horizontal
            ? { from: { xPercent: -7 }, to: { xPercent: 7 } }
            : { from: { yPercent: -7 }, to: { yPercent: 7 } };

        gsap.fromTo(imageRef.current,
            parallaxProps.from,
            {
                ...parallaxProps.to,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scroller || window,
                    horizontal: horizontal,
                    start: horizontal ? "left right" : "top bottom",
                    end: horizontal ? "right left" : "bottom top",
                    scrub: true,
                },
            }
        );

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
                className={`hidden lg:block w-full h-full ${imageClassName || ''}`}
                style={{
                    transformOrigin: "center center",
                    willChange: "transform, filter"
                }}
                onLoad={() => {
                    ScrollTrigger.refresh();
                }}
            />
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`lg:hidden w-full h-full  ${imageClassName || ''}`}
                style={{
                    transformOrigin: "center center",
                    willChange: "transform, filter"
                }}
            />
        </div>
    );
}

export { ScrollImage };

