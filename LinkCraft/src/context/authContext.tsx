import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AppUser, UserRole } from "../types/auth";

interface AuthContextValue {
  appUser: AppUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;
      setIsLoading(true);

      if (!firebaseUser) {
        setAppUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (!mounted) return;

        if (snap.exists()) {
          const data = snap.data();
          const role = (data?.role as UserRole) ?? "Viewer";
          setAppUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            role,
          });
        } else {
          console.warn(
            `User document not found in "users" collection for uid: ${firebaseUser.uid}. Creating default document.`
          );
          const defaultUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            role: "Viewer" as UserRole,
          };

          try {
            await setDoc(userRef, defaultUserData);
          } catch (setError: unknown) {
            console.warn(
              "Failed to auto-create user document, using in-memory fallback",
              setError
            );
          }

          setAppUser(defaultUserData);
        }
      } catch (error: unknown) {
        if (error && typeof error === "object") {
          const e = error as {
            message?: string;
            code?: string;
            stack?: string;
          };
          console.error("Error reading user profile from Firestore", {
            message: e.message,
            code: e.code,
            stack: e.stack,
            uid: firebaseUser?.uid,
          });
        } else {
          console.error("Error reading user profile from Firestore", error);
        }
        setAppUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          role: "Viewer",
        });
      } finally {
        if (mounted) setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setAppUser(null);
    } catch (err) {
      console.error("Error during signOut", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ appUser, isLoading, logout }}>
      {isLoading ? (
        <div className="center-loader" style={{ height: "100vh" }}>
          <div className="loader">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
