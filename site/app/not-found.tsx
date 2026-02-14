import { Navbar } from "@/components/Navbar";
import { BigText, MediumText, Section, SmallText } from "@/components/components";
import { Copy } from "@/components/custom/copy";

export default function NotFound() {
    return (
        <Section className="overflow-hidden justify-between">
            <div className="flex flex-col gap-10">
                <Navbar />
                <Copy animateOnScroll={false}>
                    <BigText className="md:text-[15vw] lg:text-[20vw] xl:text-[27vw]">Oops...</BigText>
                </Copy>
            </div>
            <div className="flex flex-col lg:flex-row justify-between">
                <Copy animateOnScroll={false} delay={0.5}>
                    <SmallText>Error 404</SmallText>
                </Copy>
                <Copy animateOnScroll={false} delay={0.9}>
                    <SmallText>Page not found</SmallText>
                </Copy>
                <Copy animateOnScroll={false} delay={1.3}>
                    <MediumText className="flex-1 max-w-2xl lg:text-4xl">
                        Houston, we have a problem... Updating your navigation cordinates directions to the motherpage in 3... 2... 1...
                    </MediumText>
                </Copy>
            </div>
        </Section>
    );
}