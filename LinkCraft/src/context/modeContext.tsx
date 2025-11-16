import React, { createContext, useContext, useEffect, useState } from "react";

export type EditorMode = "Editing" | "Viewing";

interface ModeContextValue {
  mode: EditorMode;
  setMode: (m: EditorMode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

const STORAGE_KEY = "app:editorMode";

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<EditorMode>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return "Editing";
      return (JSON.parse(raw) as EditorMode) ?? "Editing";
    } catch {
      return "Editing";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
    } catch (error) {
      console.debug("Failed to save editor mode to localStorage:", error);
    }
  }, [mode]);

  const setMode = (m: EditorMode) => setModeState(m);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextValue => {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
};
