import type { NextFunction, Request, Response } from "express";

export function postAdminsRegisterHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.json({
    message:
      "Hello World from v1 admins router register! We are implementing Admins Register feature.",
  });
}
