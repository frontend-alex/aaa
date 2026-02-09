import { cn } from "@/lib/utils";

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

export { Section, SmallText, BigText }
