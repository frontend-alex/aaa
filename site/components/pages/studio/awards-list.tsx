"use client";

import { BaseText, SmallText } from "@/components/components";
import { AWARDS, PUBLICATIONS } from "@/constants/data";
import { TranslationKey } from "@/lib/i18n/dictionaries";
import { useTranslate } from "@/hooks/useTranslate";

export function AwardsList() {
    const { t } = useTranslate();
    return (
        <div className="flex flex-col gap-20 w-full">
            {/* Awards Section */}
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full">
                <div className="w-1/3">
                    <SmallText className="font-bold">{t("awards.title")}</SmallText>
                </div>

                <div className="flex-grow flex flex-col w-full">
                    <div className="grid grid-cols-12 pb-5 border-b border-neutral-300">
                        <div className="col-span-2 hidden lg:block"><SmallText className="text-neutral-500">{t("awards.year")}</SmallText></div>
                        <div className="col-span-4 hidden lg:block"><SmallText className="text-neutral-500">{t("awards.project")}</SmallText></div>
                        <div className="col-span-6 hidden lg:block"><SmallText className="text-neutral-500">{t("awards.award")}</SmallText></div>
                    </div>

                    <div className="flex flex-col">
                        {AWARDS.map((award, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 py-6 lg:py-5 border-b border-neutral-200 gap-1 lg:gap-4 items-start">
                                <div className="lg:col-span-2">
                                    <SmallText className="lg:hidden text-neutral-500 mb-1">{t("awards.year")}</SmallText>
                                    <BaseText className="font-bold">{award.year}</BaseText>
                                </div>
                                <div className="lg:col-span-4">
                                    <SmallText className="lg:hidden text-neutral-500 mb-1 mt-3">{t("awards.project")}</SmallText>
                                    <BaseText>{t(award.project as TranslationKey)}</BaseText>
                                </div>
                                <div className="lg:col-span-6">
                                    <SmallText className="lg:hidden text-neutral-500 mb-1 mt-3">{t("awards.award")}</SmallText>
                                    <BaseText>{t(award.award as TranslationKey)}</BaseText>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Publications Section */}
            {PUBLICATIONS.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full mt-10">
                    <div className="lg:w-1/3">
                        <SmallText className="font-bold">{t("publications.title")}</SmallText>
                    </div>

                    <div className="flex-grow flex flex-col w-full">
                        <div className="grid grid-cols-12 pb-5 border-b border-neutral-300">
                            <div className="col-span-2 hidden lg:block"><SmallText className="text-neutral-500">{t("awards.year")}</SmallText></div>
                            <div className="col-span-4 hidden lg:block"><SmallText className="text-neutral-500">{t("publications.publication")}</SmallText></div>
                            <div className="col-span-6 hidden lg:block"><SmallText className="text-neutral-500">{t("publications.article")}</SmallText></div>
                        </div>

                        <div className="flex flex-col">
                            {PUBLICATIONS.map((pub, i) => (
                                <div key={`pub-${i}`} className="grid grid-cols-1 lg:grid-cols-12 py-6 lg:py-5 border-b border-neutral-200 gap-1 lg:gap-4 items-start">
                                    <div className="lg:col-span-2">
                                        <SmallText className="lg:hidden text-neutral-500 mb-1">{t("awards.year")}</SmallText>
                                        <BaseText className="font-bold">{pub.year}</BaseText>
                                    </div>
                                    <div className="lg:col-span-4">
                                        <SmallText className="lg:hidden text-neutral-500 mb-1 mt-3">{t("publications.publication")}</SmallText>
                                        <BaseText>{t(pub.publication as TranslationKey)}</BaseText>
                                    </div>
                                    <div className="lg:col-span-6">
                                        <SmallText className="lg:hidden text-neutral-500 mb-1 mt-3">{t("publications.article")}</SmallText>
                                        <BaseText>{t(pub.article as TranslationKey)}</BaseText>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
