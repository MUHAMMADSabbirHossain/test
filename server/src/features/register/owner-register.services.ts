import type { Request, Response } from "express";
import { postCreateOwnerSchema } from "./owner-register.schemas.js";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/database/prisma-db.js";

export async function postCreateOwnerService(
  request: Request,
  response: Response
) {
  try {
    const validationBodyData = postCreateOwnerSchema.safeParse(request.body);

    if (!validationBodyData.success) {
      return response.status(400).send(validationBodyData.error.flatten());
    }

    if (validationBodyData?.success === true) {
      const { email, password } = validationBodyData?.data;

      // Get role ID (assume you have a helper or query)
      const responseUserRole = await prisma.userRole.findUnique({
        where: { name: "OWNER" },
      });

      if (!responseUserRole || !responseUserRole.id) {
        return response.status(404).send({ message: "Role not found" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser && existingUser.id) {
        return response.status(409).send({ message: "User already exists" });
      }

      /* Hash password */
      const hashedPassword = await bcrypt.hash(password, 10);

      /* Create new owner */
      const responseNewOwner = await prisma.user.create({
        data: {
          email,
          userRoleId: responseUserRole.id,
          hashedPassword,
        },
      });

      if (!responseNewOwner || !responseNewOwner.id) {
        return response.status(500).send({ message: "Failed to create user" });
      }

      return response.status(201).send({
        message: "Owner created successfully",
        responseNewOwner,
      });
    }
  } catch (error) {
    console.log(error);

    return response.status(500).send(error);
  }
}
