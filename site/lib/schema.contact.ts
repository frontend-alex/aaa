import * as z from 'zod';

export const contactSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long")
        .regex(/^[a-zA-ZÀ-ÿ' -]+$/, "First name contains invalid characters"),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name is too long")
        .regex(/^[a-zA-ZÀ-ÿ' -]+$/, "Last name contains invalid characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email format")
        .max(100, "Email is too long"),

    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message is too long"),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;