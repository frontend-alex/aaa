"use client";

import { BigText, Section, SmallText } from "@/components/components";
import { Text } from "@/components/custom/text/text";
import { StudioLanding } from "@/components/pages/studio/studio-landing";
import { TeamList } from "@/components/pages/studio/team-list";


export default function StudioPage() {

    return (
        <Section className="flex flex-col gap-30 mb-30">
            <StudioLanding />
            <div className="flex flex-col gap-5">
                <Text>
                    <SmallText className="uppercase">(our team)</SmallText>
                </Text>
                <Text delay={0.5}>
                    <BigText>MEET THE TEAM behind everything</BigText>
                </Text>
                <TeamList />
            </div>
        </Section>
    )
}
