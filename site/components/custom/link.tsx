"use client";

import React, { forwardRef } from "react";
import { Link as TransitionLink } from "next-transition-router";
import { useTranslate } from "@/hooks/useTranslate";

export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(
    ({ href, ...props }, ref) => {
        const { language } = useTranslate();

        // Check if href is an external link or anchored link
        const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
        const isAnchor = href.startsWith('#');

        // Only inject locale if the link is strictly internal and absolute
        // Assuming all our internal routes start with /
        let localizedHref = href;
        if (!isExternal && !isAnchor && href.startsWith('/')) {
            localizedHref = `/${language}${href}`;
        }

        return (
            <TransitionLink ref={ref} href={localizedHref} {...props}>
                {props.children}
            </TransitionLink>
        );
    }
);

Link.displayName = "Link";
