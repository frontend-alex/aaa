import { cn } from '@/lib/utils'
import React from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'

type SlidingTextProps = {
    children: React.ReactNode
    hoverText?: React.ReactNode
    direction?: Direction
    className?: string
}

// Only animate on md and above
const ORIGINAL_TEXT_CLASSES: Record<Direction, string> = {
    left: 'lg:group-hover:-translate-x-full',
    right: 'lg:group-hover:translate-x-full',
    up: 'lg:group-hover:-translate-y-full',
    down: 'lg:group-hover:translate-y-full',
}

const DUPLICATE_START_CLASSES: Record<Direction, string> = {
    left: 'translate-x-full',
    right: '-translate-x-full',
    up: 'translate-y-full',
    down: '-translate-y-full',
}

const DUPLICATE_HOVER_CLASSES: Record<Direction, string> = {
    left: 'lg:group-hover:translate-x-0',
    right: 'lg:group-hover:translate-x-0',
    up: 'lg:group-hover:translate-y-0',
    down: 'lg:group-hover:translate-y-0',
}

function SlidingText({ children, hoverText, direction = 'up', className }: SlidingTextProps) {
    const hasCustomHover = hoverText !== undefined;

    return (
        <span className="relative inline-block overflow-hidden cursor-pointer w-max group">
            <span className="relative inline-block">
                {hasCustomHover && (
                    <span className="invisible grid whitespace-nowrap leading-4.5 [&>*]:[grid-area:1/1]" aria-hidden="true">
                        <span className={className}>{children}</span>
                        <span className={className}>{hoverText}</span>
                    </span>
                )}

                {/* Original text sliding out */}
                <span
                    className={cn(`${hasCustomHover ? 'absolute left-0 top-0' : ''} inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${ORIGINAL_TEXT_CLASSES[direction]}`, className)}
                >
                    {children}
                </span>

                {/* Duplicate text sliding in */}
                <span
                    className={cn(`absolute left-0 top-0 hidden lg:inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${DUPLICATE_START_CLASSES[direction]} ${DUPLICATE_HOVER_CLASSES[direction]}`, className)}
                >
                    {hoverText ?? children}
                </span>
            </span>
        </span >
    )
}

export { SlidingText }


