import z from "zod";

export const credentialsValidator = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password cannot be more than 64 characters long." }),
});

export type CredentialsValidator = z.infer<typeof credentialsValidator>;
