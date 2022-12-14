import express from "express";
import { getUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
