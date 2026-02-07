import React from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'

type SlidingTextProps = {
    children: React.ReactNode
    direction?: Direction
}

const ORIGINAL_TEXT_CLASSES: Record<Direction, string> = {
    left: 'group-hover:-translate-x-full',
    right: 'group-hover:translate-x-full',
    up: 'group-hover:-translate-y-full',
    down: 'group-hover:translate-y-full',
}

const DUPLICATE_START_CLASSES: Record<Direction, string> = {
    left: 'translate-x-full',
    right: '-translate-x-full',
    up: 'translate-y-full',
    down: '-translate-y-full',
}

const DUPLICATE_HOVER_CLASSES: Record<Direction, string> = {
    left: 'group-hover:translate-x-0',
    right: 'group-hover:translate-x-0',
    up: 'group-hover:translate-y-0',
    down: 'group-hover:translate-y-0',
}

function SlidingText({ children, direction = 'up' }: SlidingTextProps) {
    return (
        <span className="group relative inline-block overflow-hidden cursor-pointer">
            <span className="relative inline-block">
                {/* Original text sliding out */}
                <span
                    className={`inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${ORIGINAL_TEXT_CLASSES[direction]}`}
                >
                    {children}
                </span>

                {/* Duplicate text sliding in */}
                <span
                    className={`absolute left-0 top-0 inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${DUPLICATE_START_CLASSES[direction]} ${DUPLICATE_HOVER_CLASSES[direction]}`}
                >
                    {children}
                </span>
            </span>
        </span>
    )
}

export { SlidingText }