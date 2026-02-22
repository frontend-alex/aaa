import { BigText, MediumText, Section, SmallText } from "@/components/components";
import { ContactSheet } from "@/components/ContactSheet";
import { Button } from "@/components/custom/button";
import { Text } from "@/components/custom/text/text";

import { StickyCards } from "@/components/pages/approach/sticky-cards";
import { PROGRESS_STEPS } from "@/constants/data";
import { ArrowDown } from "lucide-react";

import Image from "next/image";

export default function ProcessPage() {

    return (
        <>
            <Section className="gap-20">
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                        <Text>
                            <SmallText>
                                (Our Process)
                            </SmallText>
                        </Text>
                    </div>
                    <div className="flex-[4] flex flex-col gap-10 relative z-10">
                        <Text delay={0.5}>
                            <MediumText className="xl:text-7xl font-bold">
                                Great architecture isn&apos;t just about
                                talent and experience, but
                                collaborations and relationships.
                            </MediumText>
                        </Text>
                        <Image
                            src="/images/process/1.jpg"
                            alt="section-2-1-image"
                            width={1920}
                            height={1080}
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                        <SmallText>
                            (Our Approach)
                        </SmallText>
                    </div>
                    <div className="flex-[4] flex justify-between items-start relative z-10">
                        <div className="flex flex-col gap-5">
                            <p className="text-xl font-medium max-w-lg">
                                You can expect our team to expertly guide your project
                                and work closely with you at every stage from delivering
                                the initial design concepts to achieving a final build that
                                goes beyond your aspirations
                            </p>
                            <ContactSheet>
                                <Button className="w-max">Send us an inquiry</Button>
                            </ContactSheet>
                        </div>
                        <p className="text-xl font-medium hidden lg:flex">©2025</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-[90vh] w-full bg-[url('/images/header/bg2.png')] bg-fixed text-white p-5 font-bold">
                    <BigText className="text-6xl xl:text-9xl max-w-sm lg:max-w-5xl">
                        OVERVIEW OF OUR {PROGRESS_STEPS.length}-STAGE PROCESS
                    </BigText>
                    <BigText className="text-9xl flex items-center justify-end">
                        (<ArrowDown size={150} strokeWidth={2} />)
                    </BigText>
                </div>
            </Section>
            <StickyCards />
        </>
    );
}