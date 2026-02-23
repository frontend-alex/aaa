'use client'

import { BigText, Section, SmallText } from "@/components/components";
import { ContactSheet } from "@/components/ContactSheet";
import { Button } from "@/components/custom/button";
import { Text } from "@/components/custom/text/text";

import { StickyCards } from "@/components/pages/approach/sticky-cards";
import { PROGRESS_STEPS } from "@/constants/data";
import { ArrowDown } from "lucide-react";

import { ProcessHeading } from "@/components/pages/process/process-heading";
import { useTranslate } from "@/hooks/useTranslate";


export default function ProcessPage() {
    const { t } = useTranslate();

    return (
        <>
            <Section className="gap-20">
                <ProcessHeading />
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                        <SmallText>
                            {t("process.approach")}
                        </SmallText>
                    </div>
                    <div className="flex-[4] flex justify-between items-start relative z-10">
                        <div className="flex flex-col gap-5">
                            <Text delay={0.2}>
                                <p className="text-xl font-medium max-w-lg">
                                    {t("process.description")}
                                </p>
                            </Text>
                            <ContactSheet>
                                <Button className="w-max">{t("process.inquiry")}</Button>
                            </ContactSheet>
                        </div>
                        <p className="text-xl font-medium hidden lg:flex">©2025</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-[90vh] w-full bg-[url('/images/header/bg2.png')] bg-fixed text-white p-5 font-bold">
                    <Text delay={0.2}>
                        <BigText className="text-6xl xl:text-9xl max-w-sm lg:max-w-5xl">
                            {t("process.overview")} {PROGRESS_STEPS.length}{t("process.stage_process")}
                        </BigText>
                    </Text>
                    <Text delay={0.5}>
                        <BigText className="text-9xl flex items-center justify-end">
                            <ArrowDown size={150} strokeWidth={2} />
                        </BigText>
                    </Text>
                </div>
            </Section>
            <StickyCards />
        </>
    );
}