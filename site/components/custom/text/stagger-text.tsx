import React from "react";
import { cn } from "@/lib/utils";

interface RevealWrapperProps {
    children: React.ReactNode;
    className?: string; // For the outer wrapper
    textClassName?: string; // For the inner text span
    tag?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}

export function RevealWrapper({
    children,
    className,
    textClassName,
    tag: Tag = "div"
}: RevealWrapperProps) {
    return (
        <Tag className={cn("overflow-hidden relative inline-block align-top", className)}>
            <span className={cn("reveal-text block translate-y-full", textClassName)}>
                {children}
            </span>
        </Tag>
    );
}

interface StaggerTextProps {
    text: string;
    className?: string; // Wrapper class
    wordClassName?: string; // Individual word wrapper class
    textClassName?: string; // Inner text span class
    tag?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}

export function StaggerText({
    text,
    className,
    wordClassName,
    textClassName,
    tag: Tag = "div"
}: StaggerTextProps) {
    const words = text.split(" ");

    return (
        <Tag className={cn("flex flex-wrap gap-[0.25em]", className)}>
            {words.map((word, i) => (
                <RevealWrapper
                    key={i}
                    className={wordClassName}
                    textClassName={textClassName}
                    tag="span"
                >
                    {word}
                </RevealWrapper>
            ))}
        </Tag>
    );
}
