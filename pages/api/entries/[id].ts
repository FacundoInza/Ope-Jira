import type { NextApiRequest, NextApiResponse } from "next";
import moongose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!moongose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The Id is invalid" + id });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "The Id is invalid" + id });
  }
  res.status(200).json({ message: "Example" });
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "The search entry doesn't exists" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    res.status(200).json(updateEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(400).json({ message: "The search entry doesn't exist" });
  }

  return res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entry = await Entry.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }

    await entry.deleteOne();
    await db.disconnect();

    return res.status(200).json({ message: "Document delete succesfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({ message: "Enviroment error server" });
  }
};
