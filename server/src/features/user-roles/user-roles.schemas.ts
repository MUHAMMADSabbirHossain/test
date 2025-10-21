import * as z from "zod";

// Define a custom slugification function
const slugify = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, or multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
};

export const postCreateUserRolesSchema = z.object({
  name: z.enum(["OWNER", "ADMIN", "MODERATOR", "USER", "GUEST"]),
  // slug: z.string().min(2).transform(slugify), // Transform the input string to a slug
  // email: z
  //   .string()
  //   .trim()
  //   .email()
  //   .transform((email) => email.toLowerCase()),
});

export type PostCreateUserRolesSchemaTypes = z.infer<
  typeof postCreateUserRolesSchema
>;
