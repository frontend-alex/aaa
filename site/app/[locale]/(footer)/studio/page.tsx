"use client";

import { BigText, MediumText, Section, SlidingButton, SmallText } from "@/components/components";
import { Link } from "@/components/custom/link";
import { ScrollImage } from "@/components/custom/scroll-image";
import { SlidingText } from "@/components/custom/text/sliding-text";
import { Text } from "@/components/custom/text/text";
import { StudioLanding } from "@/components/pages/studio/studio-landing";
import { TeamList } from "@/components/pages/studio/team-list";
import { AwardsList } from "@/components/pages/studio/awards-list";
import { useTranslate } from "@/hooks/useTranslate";
import Image from "next/image";

export default function StudioPage() {
    const { t } = useTranslate();

    return (
        <Section className="flex flex-col gap-30">
            <StudioLanding />

            <div className="flex flex-col items-center justify-center w-full -mt-10 gap-5">
                {/* Desktop Version */}
                <div className="hidden lg:flex w-full justify-center">
                    <Text>
                        <MediumText className="max-w-4xl text-center font-bold leading-[1.2]">
                            {t("studio.partners.desc")}
                        </MediumText>
                    </Text>
                </div>
                {/* Mobile Version  */}
                <div className="flex lg:hidden w-full justify-start">
                    <Text>
                        <p className="text-start text-xl font-medium">
                            {t("studio.partners.desc")}
                        </p>
                    </Text>
                </div>
            </div>


            <div className="flex flex-col lg:flex-row gap-20">
                <div className="flex flex-col gap-5 w-full">
                    <ScrollImage src="/images/team/2.jpg" className="w-full h-[600px]" alt="section-2-1-image" width={1920} height={1080} />
                    <Text>
                        <p className="text-start text-xl font-medium max-w-lg">
                            {t("studio.history.p1")}
                        </p>
                    </Text>
                    <Text>
                        <p className="text-start text-xl font-medium max-w-lg">
                            {t("studio.history.p2")}
                        </p>
                    </Text>
                </div>
                <ScrollImage src="/images/team/1.jpg" className="w-full" alt="section-1-image" width={1920} height={1080} />
            </div>

            <div className="flex flex-col gap-5">
                <Text>
                    <SmallText className="uppercase">{t("studio.team.title")}</SmallText>
                </Text>
                <Text delay={0.5}>
                    <BigText className="leading-[1.0] tracking-tighter">{t("studio.team.heading")}</BigText>
                </Text>
                <TeamList />
            </div>


            <div className="flex flex-col lg:flex-row gap-20">
                <div className="flex flex-col gap-5 lg:w-1/3">
                    <SmallText>{t("studio.competence.title")}</SmallText>
                    <Text>
                        <p className="text-start text-xl font-medium max-w-lg">
                            {t("studio.competence.desc")}
                        </p>
                    </Text>
                </div>
                <ScrollImage src="/images/team/3.jpg" className="w-full hidden lg:block" alt="section-1-image" width={1920} height={1080} />
            </div>
            <AwardsList />
        </Section>
    )
}
