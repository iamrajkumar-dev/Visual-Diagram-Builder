import { useCallback, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { useToast } from "../components/ToastProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { Node, Edge } from "@xyflow/react";

export function useSaveDiagram(diagramId?: string, isEditor?: boolean) {
  const [saving, setSaving] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { appUser } = useAuth();

  const saveDiagram = useCallback(
    async (title: string, nodes: Node[], edges: Edge[]) => {
      if (!appUser) {
        toast.show("You must be logged in to save", { type: "error" });
        return;
      }
      if (!isEditor) {
        toast.show("You do not have permission to save", { type: "error" });
        return;
      }

      setSaving(true);
      try {
        const ref = diagramId
          ? doc(db, "diagrams", diagramId)
          : doc(db, "diagrams", `d_${Date.now()}`);
        await setDoc(
          ref,
          {
            title,
            ownerId: appUser.uid,
            nodes,
            edges,
            updatedAt: serverTimestamp(),
            ...(diagramId ? {} : { createdAt: serverTimestamp() }),
          },
          { merge: true }
        );

        toast.show(diagramId ? "Diagram updated" : "Diagram created", {
          type: "success",
        });
        setTimeout(() => navigate("/dashboard"), 600);
      } catch (err) {
        console.error("Error saving diagram:", err);
        toast.show("Save failed", { type: "error" });
      } finally {
        setSaving(false);
      }
    },
    [appUser, diagramId, isEditor, navigate, toast]
  );

  return { saveDiagram, saving };
}
