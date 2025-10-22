import z from "zod";

export const postCreateOwnerSchema = z.object({
  email: z
    .email()
    .trim()
    .min(2)
    .transform((email) => email.toLowerCase()),
  userRoleName: z.enum(["OWNER"]).transform((role) => role.toUpperCase()),
  password: z.string().min(8).trim(),
});

export type PostCreateOwnerSchemaTypes = z.infer<typeof postCreateOwnerSchema>;
