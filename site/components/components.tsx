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

function SmallText({ className, children, link = false }: CompProp & { link?: boolean }) {
    return (
        <p className={cn(`uppercase text-sm font-semibold ${link ? "underline lg:no-underline" : ""}`, className)}>
            {children}
        </p>
    )
}

function BaseText({ className, children }: CompProp) {
    return (
        <p className={cn("text-base font-medium tracking-tighter", className)}>
            {children}
        </p>
    )
}


function MediumText({ className, children }: CompProp) {
    return (
        <p className={cn("text-2xl lg:text-5xl font-medium", className)}>
            {children}
        </p>
    )
}

function BigText({ className, children }: CompProp) {
    return (
        <h1 className={cn("text-4xl md:text-5xl lg:text-7xl xl:text-9xl tracking-tighter leading-[0.85] uppercase font-medium", className)}>
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

export { Section, SmallText, BaseText, MediumText, BigText, SlidingButton }
