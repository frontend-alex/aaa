"use client";

import { createPortal } from "react-dom";
import { cloneElement, isValidElement, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { setScrollEnabled } from "@/lib/lenis";

import { Button } from "@/custom/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediumText, SmallText } from "@/components/components";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";


import { contactSchema, type ContactSchemaType } from "@/lib/schema.contact";

import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { useTranslate } from "@/hooks/useTranslate";

function ContactSheet({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslate();

    const isMounted = typeof window !== "undefined";

    useEffect(() => {
        if (isOpen) {
            setScrollEnabled(false);
        } else {
            setScrollEnabled(true);
        }
    }, [isOpen]);

    const contactForm = useForm<ContactSchemaType>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(data: ContactSchemaType) {
        alert(JSON.stringify(data));
    }

    // Clone the child element to inject onClick
    const trigger = isValidElement(children)
        ? cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
            onClick: () => setIsOpen(true),
        })
        : children;

    return (
        <>
            {trigger}

            {isMounted &&
                createPortal(
                    <>
                        {/* Backdrop */}
                        <div
                            className={cn(
                                "fixed inset-0 z-[999] bg-black/50 transition-opacity duration-500",
                                isOpen
                                    ? "pointer-events-auto opacity-100"
                                    : "pointer-events-none opacity-0"
                            )}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <div
                            className={cn(
                                "contact-overlay font-medium uppercase fixed top-0 right-0 h-full w-[400px] lg:w-[600px] p-5 bg-white z-[1000] overflow-y-auto",
                                "transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                                isOpen
                                    ? "pointer-events-auto [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]"
                                    : "pointer-events-none [clip-path:polygon(100%_0%,100%_0%,100%_100%,100%_100%)]"
                            )}
                        >
                            {/* Content */}
                            <div className="flex flex-col gap-10 w-full flex-1 justify-center">
                                <div className="flex flex-row items-center justify-between">
                                    <MediumText className="lg:text-4xl normal-case">
                                        {t("contact.title")}
                                    </MediumText>
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        variant="ghost"
                                        className="p-0 text-sm font-semibold"
                                    >
                                        {t("contact.close")}
                                    </Button>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <SmallText>{t("contact.about")}</SmallText>
                                    <form
                                        onSubmit={contactForm.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-3 normal-case"
                                    >
                                        <FieldGroup className="flex flex-row gap-3">
                                            <Controller
                                                name="firstName"
                                                control={contactForm.control}
                                                render={({ field, fieldState }) => (
                                                    <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="contact-firstName">
                                                            {t("contact.first_name")}
                                                        </FieldLabel>
                                                        <Input
                                                            {...field}
                                                            className="no-ring input"
                                                            id="contact-firstName"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder={t("contact.first_name_ph")}
                                                            autoComplete="off"
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                            <Controller
                                                name="lastName"
                                                control={contactForm.control}
                                                render={({ field, fieldState }) => (
                                                    <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="contact-lastName">
                                                            {t("contact.last_name")}
                                                        </FieldLabel>
                                                        <Input
                                                            className="no-ring input"
                                                            {...field}
                                                            id="contact-lastName"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder={t("contact.last_name_ph")}
                                                            autoComplete="off"
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </FieldGroup>
                                        <Controller
                                            name="email"
                                            control={contactForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="contact-email">
                                                        {t("contact.email")}
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        className="no-ring input"
                                                        id="contact-email"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder={t("contact.email_ph")}
                                                        autoComplete="off"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="message"
                                            control={contactForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field className="gap-2" data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="contact-message">
                                                        {t("contact.message")}
                                                    </FieldLabel>
                                                    <Textarea
                                                        {...field}
                                                        className="no-ring input min-h-[150px]"
                                                        id="contact-message"
                                                        aria-invalid={fieldState.invalid}
                                                        autoComplete="off"
                                                        placeholder={t("contact.message_ph")}
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                        <Button type="submit" className="w-max ml-auto">
                                            {t("contact.send")}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}

export { ContactSheet };

