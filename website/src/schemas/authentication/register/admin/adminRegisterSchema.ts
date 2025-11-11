import z from "zod";

export const adminRegisterSchema = z.object({
  email: z
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email is required.",
    }),
  // userRoleName: z.enum(["OWNER"]).transform((role) => role.toUpperCase()),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
