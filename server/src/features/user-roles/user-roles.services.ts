/* External imports */
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/database/prisma-db.js";

/* Internal imports */
import { postCreateUserRolesSchema } from "./user-roles.schemas.js";
import type {
  UserRoleNameType,
  UserRoleSlugType,
} from "../../../generated/prisma/index.js";

/* All user roles and their slugs mapping. Note: Never change without consideration with owners. */
const SLUG_MAP: Record<UserRoleNameType, UserRoleSlugType> = {
  OWNER: "owner",
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest",
};

export async function postCreateUserRolesService(
  request: Request,
  response: Response
) {
  try {
    const { name: requestedName } = request.body;

    const validationBoddyData = postCreateUserRolesSchema.safeParse({
      requestedName,
    });
    console.log(validationBoddyData);

    if (!validationBoddyData.success) {
      return response.status(400).send(validationBoddyData.error.flatten());
    }

    if (validationBoddyData?.success === true) {
      const { name } = validationBoddyData?.data;

      /* Create new user role */
      const responseNewUserRole = await prisma.userRole.create({
        data: {
          name,
          slug: SLUG_MAP[name],
        },
      });
      console.log(responseNewUserRole);

      return response.status(201).send(responseNewUserRole);
    }
  } catch (error) {
    console.log(error);

    return response.status(500).send(error);
  }
}
