import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Internal imports */
import {
  postLoginOwnerSchema,
  type PostLoginOwnerSchemaTypes,
} from "./owner-login.schemas.js";
import { prisma } from "../../lib/database/prisma-db.js";

export async function postLoginOwnerService(
  request: Request<{}, PostLoginOwnerSchemaTypes>,
  response: Response
) {
  try {
    const validationBodyData = postLoginOwnerSchema.safeParse(request.body);
    // console.log(validationBodyData);

    if (!validationBodyData.success) {
      return response.status(400).send(validationBodyData.error.flatten());
    }

    const { email, userRoleName, password } = validationBodyData?.data;

    const responseUser = await prisma.user.findUnique({
      where: { email: email },
      include: {
        userRole: true,
      },
    });
    // console.log(responseUser);

    if (!responseUser || !responseUser.id) {
      return response.status(404).send({ message: "User not found" });
    }

    if (responseUser.userRole.name !== userRoleName) {
      return response.status(401).send({ message: "Unauthorized" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      responseUser.hashedPassword
    );

    if (!isPasswordValid) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    if (
      responseUser.userRoleId !== 1 &&
      responseUser.userRole.name !== "OWNER"
    ) {
      return response.status(401).send({
        message:
          "Unauthorized access. Insufficient permissions is not allowed.",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (!JWT_SECRET) {
      return response
        .status(500)
        .send({ message: "Internal server error: JWT_SECRET is not defined" });
    }

    const token = jwt.sign(
      {
        id: responseUser.id,
        email: responseUser.email,
        userRole: responseUser.userRole.name,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return response
      .status(200)
      .cookie("auth_token", token, {
        httpOnly: true, // Crucial: Prevents client-side JS access (XSS protection)
        secure: process.env.NODE_ENV === "production", // Use 'true' in production with HTTPS
        sameSite: "strict", // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds, matching JWT expiry
        path: "/", // Cookie is accessible on all routes under the root
        // domain: ".yourdomain.com" // Optional: specify domain if needed for subdomain sharing
      })
      .send({
        user: {
          // id: responseUser.id,
          email: responseUser.email,
          userRole: responseUser.userRole.name,
        },
      });
  } catch (error) {
    console.log(error);

    return response
      .status(500)
      .cookie("auth_token", "no-token", {
        httpOnly: true, // Crucial: Prevents client-side JS access (XSS protection)
        secure: process.env.NODE_ENV === "production", // Use 'true' in production with HTTPS
        sameSite: "strict", // CSRF protection
      })
      .send({ message: "Internal server error" });
  }
}
