import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
