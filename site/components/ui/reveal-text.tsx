"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RevealTextProps {
    children: React.ReactNode;
    className?: string;
    trigger?: "manual" | "viewport";
    delay?: number;
}

export function RevealText({
    children,
    className,
    trigger = "viewport",
    delay = 0,
}: RevealTextProps) {
    return (
        <div className={cn("overflow-hidden", className)}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={trigger === "viewport" ? { y: 0 } : undefined}
                animate={trigger === "manual" ? { y: 0 } : undefined}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}
