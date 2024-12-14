import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import db from "../config/firebaseConfig";
import { User } from "../entities/user";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const USERS_COLLECTION = "users";

export const updateUser = async (user: User): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.id);

    await setDoc(
      userRef,
      {
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        role: user.role,
        updatedAt: user.updatedAt,
      },
      { merge: true }
    );

    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user data");
  }
};

export const fetchUser = async (userId: string): Promise<object> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error(`No user found with id: ${userId}`);
      throw new Error("User not found");
    }

    const userData = userDoc.data();

    if (!userData) {
      throw new Error("Failed to retrieve user data");
    }

    const { password, createdAt, ...rest } = userData;

    const formattedCreatedAt = createdAt
      ? format(new Date(createdAt), "dd MMM yyyy", { locale: enUS })
      : null;

    return {
      ...rest,
      createdAt: formattedCreatedAt,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchAllUsersData = async (): Promise<{
  message: string;
  data: object[];
}> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const querySnapshot = await getDocs(usersRef);

    const users = querySnapshot.docs.map((doc) => {
      const { password, createdAt, ...rest } = doc.data();
      const formattedCreatedAt = createdAt
        ? format(new Date(createdAt), "dd MMM yyyy", { locale: enUS })
        : null;

      return {
        ...rest,
        id: doc.id,
        createdAt: formattedCreatedAt,
      };
    });

    return {
      message: "success",
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
