import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please insert a valid email address.")
    .min(1, "Please provide your email address."),
  password: z.string().min(1, "Please provide your password."),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email("Please insert a valid email address.")
      .min(1, "Please provide your email address."),
    location: z.string().min(1, "Please provide your location."),
    password: z.string().min(1, "Please create your password."),
    confirm_password: z.string().min(1, "Please confirm your password."),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const jobSchema = z.object({
  hourlyRate: z
    .number()
    .min(0.01, "Hourly rate must be greater than 0.")
    .nonnegative("Hourly rate must be a positive number."),
  jobTitle: z.string().min(1, "Please provide the job title."),
});

export const shiftValidationSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please insert a valid date.",
  }),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please insert a valid start time."),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please insert a valid end time."),
  shiftType: z.enum(["opening", "mid", "closing"]),
  job: z.string().min(1, "Please provide the job."),
});