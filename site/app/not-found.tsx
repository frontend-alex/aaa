'use client'

import { Navbar } from "@/components/Navbar";
import { BigText, MediumText, Section, SmallText } from "@/components/components";
import { Button } from "@/custom/button";
import { Text } from "@/custom/text/text";
import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    return (
        <Section className="overflow-hidden justify-between">
            <div className="flex flex-col gap-10">
                <Navbar />
                <Text animateOnScroll={false}>
                    <BigText className="md:text-[15vw] lg:text-[20vw] xl:text-[27vw]">Oops...</BigText>
                </Text>
                <Button onClick={() => {
                    if (window.history.length > 1) {
                        router.back();
                    } else {
                        router.push("/");
                    }
                }}>Go Back</Button>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <Text animateOnScroll={false} delay={0.5}>
                    <SmallText>Error 404</SmallText>
                </Text>
                <Text animateOnScroll={false} delay={0.9}>
                    <SmallText>Page not found</SmallText>
                </Text>
                <Text animateOnScroll={false} delay={1.3}>
                    <MediumText className="flex-1 max-w-2xl lg:text-4xl">
                        Houston, we have a problem... Updating your navigation cordinates directions to the motherpage in 3...2...1...
                    </MediumText>
                </Text>
            </div>
        </Section>
    );
}