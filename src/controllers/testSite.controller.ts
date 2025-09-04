import { Request, Response } from "express";
import prisma from "../prisma";
import { AppError } from "../core/utils/error/appError";

export const authTestSite = (req: Request, res: Response) => {
  const html = `<div><h2>Test Link</h2></div>`;
  res.status(200).json({ message: "Successfully Entered", data: html });
};

export const adminTest = (req: Request, res: Response) => {
  const html = `<div><h2>Test Admin</h2></div>`;
  res.status(200).json({ message: "Welcome back admin", data: html });
};

export const promoteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = +id;
  const { newRole } = req.body;

  if (!["admin", "manager", "admin"].includes(newRole))
    throw new AppError(401, "Invalid Role");

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      role: newRole,
    },
  });

  res.status(200).json({ message: "Changed in role successful", data: user });
};
