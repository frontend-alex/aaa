import * as React from "react"
import { Button as ShadcnButton } from "@/components/ui/button"
import { type VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { SlidingText } from "./sliding-text"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const customButtonVariants = cva(
    "flex flex-row items-center justify-between gap-3 p-5 py-6 uppercase text-sm font-semibold tracking-tighter box-border cursor-pointer group",
    {
        variants: {
            variant: {
                default: "hover:bg-black hover:dark:bg-white",
                outline: "hover:bg-none",
                secondary: "hover:bg-none",
                ghost: "hover:bg-transparent",
                destructive: "hover:bg-none",
                link: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const circleVariants = cva(
    "size-1.5 rounded-full bg-transparent border transition-all group-hover:scale-60",
    {
        variants: {
            variant: {
                default: "border-primary-foreground group-hover:bg-primary-foreground",
                outline: "border-foreground group-hover:bg-foreground",
                secondary: "border-secondary-foreground group-hover:bg-secondary-foreground",
                ghost: "border-foreground group-hover:bg-foreground",
                destructive: "border-destructive group-hover:bg-destructive",
                link: "border-primary group-hover:bg-primary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

// Circle component that adapts to button variant
function Circle({ variant = "default", className }: { variant?: VariantProps<typeof buttonVariants>["variant"], className?: string }) {
    return (
        <span className={cn(circleVariants({ variant }), className)} />
    )
}

type ButtonProps = React.ComponentProps<typeof ShadcnButton> & VariantProps<typeof buttonVariants> & {
    circle?: boolean
    circleClassName?: string
}

// Custom Button wrapper that wraps shadcn Button
function Button({
    className,
    variant = "default",
    children,
    circleClassName,
    circle,
    ...props
}: ButtonProps) {
    const isDefault = variant === "default"
    const showCircle = circle !== undefined ? circle : isDefault

    return (
        <ShadcnButton
            variant={variant}
            className={cn(
                customButtonVariants({ variant }),
                className
            )}
            {...props}
        >
            <SlidingText>{children}</SlidingText>
            {showCircle && <Circle className={circleClassName} variant={variant} />}
        </ShadcnButton>
    )
}

export { Button, Circle }