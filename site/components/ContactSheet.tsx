import { MediumText, SmallText } from "@/components/components"
import { Button } from "@/custom/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { setScrollEnabled } from "@/lib/lenis"
import { contactSchema, type ContactSchemaType } from "@/lib/schema.contact"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

function ContactSheet({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        setScrollEnabled(!value)
    }

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
        alert(JSON.stringify(data))
    }


    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                {children ?? <Button variant="outline">Open Sheet</Button>}
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-10 lg:min-w-[500px] p-5" showCloseButton={false}>
                <MediumText className="lg:text-4xl">Let&apos;s start something great</MediumText>
                <div className="flex flex-col gap-5">
                    <SmallText>(About you)</SmallText>
                    <form onSubmit={contactForm.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FieldGroup className="flex flex-row gap-3">
                            <Controller
                                name="firstName"
                                control={contactForm.control}
                                render={({ field, fieldState }) => (
                                    <Field className="gap-2" data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            First Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            className="no-ring input"
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="John"
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
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Last Name
                                        </FieldLabel>
                                        <Input
                                            className="no-ring input"
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Doe"
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
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        className="no-ring input"
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="example@domain.com"
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
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Message
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        className="no-ring input min-h-[150px]"
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        placeholder="Your message..."
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button type="submit" className="w-max ml-auto">Send message</Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export { ContactSheet }

