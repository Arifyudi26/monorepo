import express from "express";
import {
  updateUserData,
  fetchUserData,
  fetchAllUsers,
  signUp,
  signIn,
} from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.put("/update-user-data", authMiddleware, updateUserData);
router.get("/fetch-user-data/:id", authMiddleware, fetchUserData);
router.get("/fetch-all-user", authMiddleware, fetchAllUsers);

export default router;
