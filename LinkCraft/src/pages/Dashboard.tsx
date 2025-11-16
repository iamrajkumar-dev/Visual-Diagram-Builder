import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/authContext";
import { useToast } from "../components/ToastProvider";

interface Diagram {
  id: string;
  title: string;
  ownerId: string;
  updatedAt?: { seconds: number };
  createdAt?: { seconds: number };
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const toast = useToast();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;

    const fetchDiagrams = async () => {
      try {
        const q = query(
          collection(db, "diagrams"),
          where("ownerId", "==", appUser.uid)
        );
        const snap = await getDocs(q);
        const list: Diagram[] = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Diagram[];
        setDiagrams(list);
      } catch (err) {
        console.error("Failed to fetch diagrams:", err);
        toast.show("Failed to load diagrams", { type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchDiagrams();
  }, [appUser, toast]);

  const handleCreate = () => {
    if (appUser?.role !== "Editor") {
      toast.show("Viewers cannot create diagrams", { type: "error" });
      return;
    }
    navigate("/editor/new");
  };

  if (loading) {
    return (
      <div className="center-loader" style={{ height: "calc(100vh - 80px)" }}>
        <div className="loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <div className="card" style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Your Diagrams</h2>
          <button
            className="btn-primary"
            onClick={handleCreate}
            disabled={appUser?.role !== "Editor"}
            title={
              appUser?.role !== "Editor"
                ? "Only editors can create"
                : "Create new diagram"
            }
          >
            + New
          </button>
        </div>

        {diagrams.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "var(--muted)",
              marginTop: 40,
            }}
          >
            No diagrams found.
            <br />
            {appUser?.role === "Editor" && (
              <button
                className="btn-ghost"
                style={{ marginTop: 12 }}
                onClick={handleCreate}
              >
                Create your first diagram
              </button>
            )}
          </div>
        ) : (
          <div className="diagrams-grid">
            {diagrams.map((d) => (
              <div
                key={d.id}
                className="diagram-tile"
                onClick={() => navigate(`/editor/${d.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="title">{d.title || "Untitled Diagram"}</div>
                <div className="meta">
                  {d.updatedAt
                    ? new Date(d.updatedAt.seconds * 1000).toLocaleString()
                    : d.createdAt
                    ? new Date(d.createdAt.seconds * 1000).toLocaleString()
                    : "No timestamp"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ width: "100%", maxWidth: 360 }}>
        <h3 style={{ marginTop: 0 }}>Welcome back</h3>
        <p>
          <strong>{appUser?.email ?? "User"}</strong>
          <br />
          <small>{appUser?.role ?? "Viewer"}</small>
        </p>

        <hr />
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Here you can manage your saved diagrams. Select one to open the editor
          or create new ones (if you have Editor access).
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
