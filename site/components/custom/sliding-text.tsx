import React from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'

type SlidingTextProps = {
    children: React.ReactNode
    hoverText?: React.ReactNode
    direction?: Direction
    groupName?: string
}

const TRANSFORMS: Record<Direction, { out: string; start: string }> = {
    left: { out: '-100%', start: '100%' },
    right: { out: '100%', start: '-100%' },
    up: { out: '-100%', start: '100%' },
    down: { out: '100%', start: '-100%' },
}

const AXIS: Record<Direction, 'X' | 'Y'> = {
    left: 'X',
    right: 'X',
    up: 'Y',
    down: 'Y',
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

function SlidingText({ children, hoverText, direction = 'up', groupName }: SlidingTextProps) {
    const hasCustomHover = hoverText !== undefined;
    const axis = AXIS[direction];
    const transforms = TRANSFORMS[direction];

    // When groupName is set, use CSS custom selector via style tag
    // When not set, use the self-contained group approach
    const useNamedGroup = !!groupName;
    const selector = groupName ? `:is(.group\\/${groupName}):hover` : undefined;

    return (
        <span className={`${useNamedGroup ? '' : 'group'} relative inline-block overflow-hidden cursor-pointer w-max`}>
            <span className="relative inline-block">
                {hasCustomHover && (
                    <span className="invisible grid whitespace-nowrap leading-4.5 [&>*]:[grid-area:1/1]" aria-hidden="true">
                        <span>{children}</span>
                        <span>{hoverText}</span>
                    </span>
                )}

                {/* Original text sliding out */}
                <span
                    className={`${hasCustomHover ? 'absolute left-0 top-0' : ''} inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${!useNamedGroup ? ORIGINAL_TEXT_CLASSES[direction] : ''}`}
                    data-slide="original"
                >
                    {children}
                </span>

                {/* Duplicate text sliding in */}
                <span
                    className={`absolute left-0 top-0 hidden lg:inline-block whitespace-nowrap leading-4.5 transition-transform duration-300 ease-out ${!useNamedGroup ? `${DUPLICATE_START_CLASSES[direction]} ${DUPLICATE_HOVER_CLASSES[direction]}` : ''}`}
                    data-slide="duplicate"
                    style={useNamedGroup ? { transform: `translate${axis}(${transforms.start})` } : undefined}
                >
                    {hoverText ?? children}
                </span>
            </span>

            {useNamedGroup && (
                <style>{`
                    @media (min-width: 1024px) {
                        ${selector} [data-slide="original"] {
                            transform: translate${axis}(${transforms.out}) !important;
                        }
                        ${selector} [data-slide="duplicate"] {
                            transform: translate${axis}(0%) !important;
                        }
                    }
                `}</style>
            )}
        </span>
    )
}

export { SlidingText }

