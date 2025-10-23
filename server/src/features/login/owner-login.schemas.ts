import z from "zod";

export const postLoginOwnerSchema = z.object({
  email: z
    .email()
    .trim()
    .min(2)
    .transform((email) => email.toLowerCase()),
  userRoleName: z.enum(["OWNER"]).transform((role) => role.toUpperCase()),
  password: z.string().min(8).trim(),
});

export type PostLoginOwnerSchemaTypes = z.infer<typeof postLoginOwnerSchema>;
