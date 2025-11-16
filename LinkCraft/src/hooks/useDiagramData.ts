import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useToast } from "../components/ToastProvider";
import { useNavigate } from "react-router-dom";
import type { Node, Edge } from "@xyflow/react";

type DiagramDoc = {
  title?: string;
  ownerId?: string;
  nodes?: Node[];
  edges?: Edge[];
  collaborators?: Record<string, "Viewer" | "Editor">;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export function useDiagramData(diagramId?: string) {
  const [title, setTitle] = useState<string>("Untitled Diagram");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(!!diagramId);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!diagramId) {
      setLoading(false);
      return;
    }

    const fetchDiagram = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "diagrams", diagramId);

        const snap = await getDoc(ref);

        if (!snap.exists()) {
          toast.show("Diagram not found", { type: "error" });
          navigate("/dashboard");
          return;
        }

        const data = snap.data() as DiagramDoc;
        setTitle(data.title ?? "Untitled Diagram");
        setNodes(data.nodes ?? []);
        setEdges(data.edges ?? []);
      } catch (err) {
        console.error("Error loading diagram:", err);
        toast.show("Failed to load diagram", { type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchDiagram();
  }, [diagramId, navigate, toast]);

  return { title, setTitle, nodes, setNodes, edges, setEdges, loading };
}
