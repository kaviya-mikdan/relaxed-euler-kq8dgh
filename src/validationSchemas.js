import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
});

export const step2Schema = z.object({
  lastName: z.string().min(1, "Last Name is required"),
});

export const step3Schema = z.object({
  email: z.string().min(1, "Email is required"),
});

export const step4Schema = z.object({
  phone: z.string().min(1, "Phone number must be at least 10 digits"),
});

export const step5Schema = z.object({
  address: z.string().min(1, "Address is required"),
});
