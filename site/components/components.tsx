import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type CompProp = {
    className?: string,
    children: React.ReactNode
}

function Section({ className, children }: CompProp) {
    return (
        <section className={cn("min-h-screen p-5 flex flex-col z-20 gap-5", className)}>
            {children}
        </section>
    )
}

function SmallText({ className, children }: CompProp) {
    return (
        <p className={cn("small-text", className)}>
            {children}
        </p>
    )
}

function BigText({ className, children }: CompProp) {
    return (
        <h1 className={cn("big-text", className)}>
            {children}
        </h1>
    )
}

function SlidingButton({ className, children, icon: Icon = ArrowRight }: CompProp & { icon?: React.ElementType }) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {children}
            <Icon size={12} strokeWidth={3} />
        </div>
    )
}

export { Section, SmallText, BigText, SlidingButton }
