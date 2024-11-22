import { Request, Response } from "express";
import {
  updateUser,
  fetchUser,
  fetchAllUsersData,
} from "../repository/userCollection";
import jwt from "jsonwebtoken";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    res
      .status(400)
      .json({ message: "Email, password, and username are required" });
    return;
  }

  try {
    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: userId,
      email,
      displayName,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    const docRef = doc(db, "users", userId);
    await setDoc(docRef, newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { uid: userData.uid, email: userData.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Sign-in successful",
      user: {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        createdAt: userData.createdAt,
        role: userData.role,
      },
      token,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during sign-in process:", error.message);
      res
        .status(500)
        .json({ message: "Failed to sign in", error: error.message });
    } else {
      console.error("Unknown error occurred during sign-in");
      res
        .status(500)
        .json({ message: "Failed to sign in", error: "Unknown error" });
    }
  }
};

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, displayName, id, bio, phone, role, updatedAt } = req.body;

    if (!email || !displayName || !id || !role) {
      res.status(400).json({status: 400, message: "Missing required fields" });
      return;
    }

    const user = { email, displayName, id, bio, phone, role, updatedAt };
    await updateUser(user);

    res.status(200).json({ status: 200, message: "User updated successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message });
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await fetchUser(userId);

    const responseData = {
      ...user,
      id: userId,
    };

    res.status(200).json(responseData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(404).json({ message });
  }
};

export const fetchAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsersData();

    res.status(200).json(users);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message });
  }
};
