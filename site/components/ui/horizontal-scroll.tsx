"use client";

import Lenis from "lenis";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HorizontalScrollProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    getItemKey: (item: T) => string;
}

export function HorizontalScroll<T>({
    items,
    renderItem,
    className = "",
    getItemKey,
}: HorizontalScrollProps<T>) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            orientation: "horizontal",
            gestureOrientation: "both",
            infinite: false,
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [items]);

    return (
        <div
            ref={wrapperRef}
            id="project-scroller"
            className={`overflow-x-auto h-full w-full flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative ${className}`}
        >
            <div
                ref={contentRef}
                className="flex h-full w-max gap-5 px-5 lg:px-0"
            >
                <AnimatePresence mode="popLayout">
                    {items.map((item, i) => (
                        <motion.div
                            key={getItemKey(item)}
                            layout
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 20,
                                opacity: { duration: 0.5 }
                            }}
                            className="shrink-0 h-full flex flex-col justify-center"
                        >
                            {renderItem(item, i)}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
