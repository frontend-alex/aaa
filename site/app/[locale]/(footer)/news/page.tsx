"use client";
import { useTranslate } from "@/hooks/useTranslate";

export default function NewsPage() {
    const { t } = useTranslate();
    return (
        <div>
            <h1>{t("news.title")}</h1>
        </div>
    );
}