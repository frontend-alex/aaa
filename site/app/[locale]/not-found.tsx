'use client'

import { Navbar } from "@/components/Navbar";
import { BigText, MediumText, Section, SmallText } from "@/components/components";
import { Button } from "@/custom/button";
import { Text } from "@/custom/text/text";
import { useRouter } from "next/navigation";
import { useTranslate } from "@/hooks/useTranslate";

export default function NotFound() {

    const router = useRouter();
    const { t } = useTranslate();

    return (
        <Section className="overflow-hidden justify-between">
            <div className="flex flex-col gap-10">
                <Navbar className="p-0" />
                <Text animateOnScroll={false}>
                    <BigText className="md:text-[15vw] lg:text-[20vw] xl:text-[27vw]">{t("404.oops")}</BigText>
                </Text>
                <Button onClick={() => {
                    if (window.history.length > 1) {
                        router.back();
                    } else {
                        router.push("/");
                    }
                }}>{t("404.back")}</Button>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <Text animateOnScroll={false} delay={0.5}>
                    <SmallText>{t("404.error")}</SmallText>
                </Text>
                <Text animateOnScroll={false} delay={0.9}>
                    <SmallText>{t("404.not_found")}</SmallText>
                </Text>
                <Text animateOnScroll={false} delay={1.3}>
                    <MediumText className="flex-1 max-w-2xl lg:text-4xl">
                        {t("404.desc")}
                    </MediumText>
                </Text>
            </div>
        </Section>
    );
}