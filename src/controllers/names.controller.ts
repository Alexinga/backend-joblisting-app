import { Request, Response } from "express";
import prisma from "../prisma";
import {
  addNameSchema,
  deleteNameSchema,
  updateNameSchema,
} from "../schemas/zodSchema/names/names.schema";
import z from "zod";
export const getAllNames = async (req: Request, res: Response) => {
  try {
    const dataNamesArr = await prisma.names.findMany();
    // if we want to just grab just the one object instead of the whole array
    const dataNamesObj =
      dataNamesArr.length === 1 ? dataNamesArr[0] : dataNamesArr;
    res.json({ data: dataNamesObj });
  } catch (err) {
    console.error(`There was an error: ${err}`);
    res.status(500).json({ error: `An unexpected error occurred` });
  }
};

export const addName = async (req: Request, res: Response) => {
  const parseResult = addNameSchema.safeParse(req.body);
  if (!parseResult.success) {
    const formattedError = z.treeifyError(parseResult.error);
    return res.status(400).json({ error: `error occurred:`, formattedError });
  }
  const newName = parseResult.data.newName;
  try {
    const dataNamesRecords = await prisma.names.findUnique({
      where: {
        id: 1,
      },
      select: {
        friendNames: true,
      },
    });

    if (!dataNamesRecords) {
      return res.status(500).json({ message: "No Record Found" });
    }

    const updatedFriendNames: string[] = [
      ...dataNamesRecords.friendNames,
      newName,
    ];

    const dataNamesArr = await prisma.names.update({
      where: {
        id: 1,
      },
      data: {
        friendNames: updatedFriendNames,
      },
    });
    res.status(201).json({ message: "Added Name", data: dataNamesArr });
  } catch (err) {
    console.error(`There was an error in adding a name:`, err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const updateName = async (req: Request, res: Response) => {
  // const { currentName, newName } = req.body as {
  //   currentName: string;
  //   newName: string;
  // };
  // if (!currentName || !newName) {
  //   return res
  //     .status(400)
  //     .json({ error: `Need a current name and new name to update` });
  // }
  const parsedResult = updateNameSchema.safeParse(req.body);
  if (!parsedResult.success) {
    const errorTree = z.treeifyError(parsedResult.error);
    return res.status(400).json({ error: errorTree });
  }
  const { currentName, newName } = parsedResult.data;
  try {
    const dataNameRecords = await prisma.names.findUnique({
      where: {
        id: 1,
      },
      select: {
        friendNames: true,
      },
    });
    if (!dataNameRecords) {
      res.status(404).json({ error: "name records not found" });
    }
    const currentNameIndex = dataNameRecords!.friendNames.findIndex(
      (name) => name === currentName
    );
    // const index = dataArr.findIndex((name) => name === currentName);
    if (currentNameIndex === -1) {
      return res.status(404).json({ error: "name not found" });
    }
    const updateName = [...dataNameRecords!.friendNames];
    updateName[currentNameIndex] = newName;
    const dataNameArr = await prisma.names.update({
      where: {
        id: 1,
      },
      data: {
        friendNames: updateName,
      },
    });
    // dataArr[index] = newName;
    res.json({ message: "Updated Name", data: dataNameArr });
  } catch (err) {
    console.error(`There was an error updating name`, err);
    res.status(500).json({ error: `There was an internal server error` });
  }
};

export const deleteName = async (req: Request, res: Response) => {
  const parsedResult = deleteNameSchema.safeParse(req.body);
  if (!parsedResult.success) {
    const errorTree = z.treeifyError(parsedResult.error);
    return res.status(400).json({ error: errorTree });
  }
  const { name } = parsedResult.data;
  try {
    const dataNameRecords = await prisma.names.findUnique({
      where: {
        id: 1,
      },
      select: {
        friendNames: true,
      },
    });

    if (!dataNameRecords) {
      return res.status(404).json({ error: "Name records not found for ID 1" });
    }

    const existingNames = dataNameRecords.friendNames.includes(name);
    if (!existingNames) {
      return res
        .status(404)
        .json({ error: `Name '${name}' not found in the list ` });
    }
    // const indexOfName = dataNameRecords!.friendNames.findIndex(
    //   (n) => n === name
    // );
    // const index = dataArr.findIndex((n) => n === name);
    //   dataArr.splice(index, 1);
    // if (indexOfName === -1) {
    //   return res.status(404).json({ error: "name not found" });
    // }
    const filteredDataArr = dataNameRecords!.friendNames.filter(
      (n) => n !== name
    );

    const newDataArr = await prisma.names.update({
      where: {
        id: 1,
      },
      data: {
        friendNames: filteredDataArr,
      },
    });
    res.json({ message: "Deleted Name Successfully", data: newDataArr });
  } catch (err) {
    console.error(`Error in deleting name: ${err}`);
    res.status(500).json({ error: "An internal error occurred." });
  }
};
