import express from "express";
import { getFolder, createFolder } from "../controllers/folder.js";
const router = express.Router();

// http://localhost:5000/posts

router.get("/", getFolder);
router.post("/", createFolder);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);

export default router;
