"use client";

import Lenis from "lenis";
import { useRef, useMemo, useEffect } from "react";

interface InfiniteScrollProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export function InfiniteScroll<T>({
    items,
    renderItem,
    className = "",
}: InfiniteScrollProps<T>) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Dynamic duplication logic to ensure enough items for scrolling
    const duplicatedItems = useMemo(() => {
        if (!items || items.length === 0) return [];

        let newItems = [...items];
        while (newItems.length < 6) {
            newItems = [...newItems, ...items];
        }
        newItems = [...newItems, ...items];
        return [...newItems, ...newItems];
    }, [items]);

    useEffect(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            orientation: "horizontal",
            gestureOrientation: "both",
            infinite: true,
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
    }, [duplicatedItems]);

    return (
        <div
            ref={wrapperRef}
            className={`overflow-x-auto overflow-y-hidden min-h-[70dvh] w-full flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none [&_img]:select-none [&_img]:pointer-events-none ${className}`}
        >
            <div
                ref={contentRef}
                className="flex gap-8 w-max h-full"
            >
                {duplicatedItems.map((item, i) => (
                    <div key={i} className="shrink-0 h-full">
                        {renderItem(item, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}
