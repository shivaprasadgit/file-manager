import mongoose from "mongoose";
import Folder from "../models/folder.js";

export const getFolder = async (req, res) => {
  try {
    const folder = await Folder.find();
    console.log(folder);
    res.status(200).json(folder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createFolder = async (req, res) => {
  const folder = req.body;
  const createFolder = new Folder(folder);
  const { parent_id: _id } = folder;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    try {
      await createFolder.save();
      res.status(201).json({ created: createFolder, parent: false });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else {
    try {
      await createFolder.save();
      const updatedFolder = await Folder.findByIdAndUpdate(
        _id,
        { childrens: [createFolder._id], _id },
        { new: true }
      );
      res.status(201).json({ created: createFolder, parent: updatedFolder });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
