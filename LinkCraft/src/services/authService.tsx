import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { UserRole, AppUser } from "../types/auth";

function normalizeError(
  err: unknown,
  fallback = "Operation failed. Please try again."
) {
  if (err instanceof Error) return err;
  return new Error(fallback);
}

export const signupUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const initialRole: UserRole = "Editor";

    const userData: AppUser = {
      uid: user.uid,
      email: user.email ?? email,
      role: initialRole,
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error: unknown) {
    const normalized = normalizeError(
      error,
      "Signup failed. Please try again."
    );
    console.error("❌ signupUser error:", normalized.message);
    throw normalized;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    const normalized = normalizeError(error, "Login failed. Please try again.");
    console.error("❌ loginUser error:", normalized.message);
    throw normalized;
  }
};
