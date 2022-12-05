import express from "express";
import { getUsers, getPostsAll } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/posts", getPostsAll);
// router.delete("/users/:id", deleteUser);

export default router;
