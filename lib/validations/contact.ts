import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(2, "Address is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
