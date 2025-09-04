import { Request, Response } from "express";
import {
  validateBody,
  validateParam,
} from "../../../../core/utils/zodValidation/zodUtils";
import {
  createUserZodSchema,
  deleteUserZodSchema,
  updateUserIdSchema,
  updateUserZodSchema,
} from "../validators/user.zodSchema";
import { userService } from "../../../../server";

export const readUserController = async (req: Request, res: Response) => {
  const userData = await userService.readUser();
  res.status(200).json({ data: userData });
};

export const createUserController = async (req: Request, res: Response) => {
  const parsedData = validateBody(createUserZodSchema, req, res);
  if (!parsedData) return;

  const userData = await userService.createUser(parsedData);
  res.status(201).json({ message: "Successfully Added", data: userData });
};

export const updateUserController = async (req: Request, res: Response) => {
  const parsedData = validateBody(updateUserZodSchema, req, res);

  if (!parsedData) return;

  const parsedParam = validateParam(updateUserIdSchema, req);

  if (!parsedParam) return;

  const userId = parsedParam.id;

  const updateUserController = await userService.updateUser({
    id: userId,
    data: parsedData,
  });

  res
    .status(200)
    .json({ message: "Successfully updated user", data: updateUserController });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const parsedParam = validateParam(deleteUserZodSchema, req);
  if (!parsedParam) return;

  const deleteUserController = await userService.deleteUser(parsedParam);

  res
    .status(200)
    .json({ message: "Successfully deleted user", data: deleteUserController });
};
