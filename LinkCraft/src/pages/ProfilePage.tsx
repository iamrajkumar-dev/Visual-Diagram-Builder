import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useToast } from "../components/ToastProvider";

const ProfilePage: React.FC = () => {
  const { appUser, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const handleLogout = useCallback(async () => {
    setBusy(true);
    try {
      await logout();
      toast.show("Logged out", { type: "success" });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.show("Failed to logout", { type: "error" });
    } finally {
      setBusy(false);
    }
  }, [logout, toast, navigate]);

  const handleCopyUid = useCallback(async () => {
    if (!appUser?.uid) return;
    try {
      await navigator.clipboard.writeText(appUser.uid);
      toast.show("User ID copied", { type: "success" });
    } catch {
      toast.show("Failed to copy", { type: "error" });
    }
  }, [appUser?.uid, toast]);

  return (
    <div className="container profile-page">
      <div className="profile-card card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Profile</h2>

        <div style={{ marginBottom: 12 }}>
          <label className="profile-label">Email</label>
          <div className="profile-field" style={{ fontWeight: 700 }}>
            {appUser?.email ?? "—"}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label className="profile-label">Role</label>
          <div className="profile-field">{appUser?.role ?? "Viewer"}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label className="profile-label">User ID</label>
          <div
            className="profile-field"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <span style={{ fontFamily: "monospace", color: "var(--muted)" }}>
              {appUser?.uid ?? "—"}
            </span>
            {appUser?.uid && (
              <button
                className="btn-ghost"
                onClick={handleCopyUid}
                style={{ padding: "6px 8px" }}
              >
                Copy UID
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            className="btn-primary"
            onClick={() => navigate("/dashboard")}
            title="Go to Dashboard"
            style={{ minWidth: 120 }}
          >
            Open Dashboard
          </button>

          <button
            className="btn-ghost"
            onClick={handleLogout}
            disabled={busy}
            style={{ minWidth: 120 }}
          >
            {busy ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <aside style={{ width: 320 }}>
        <div className="card profile-card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>About</h3>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Linkcraft — Visual Diagram Builder. Your session is secured via
            Firebase Authentication.
          </p>

          <hr />

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              className="btn-ghost"
              onClick={() => navigate("/editor/new")}
              disabled={appUser?.role !== "Editor"}
              title={
                appUser?.role !== "Editor"
                  ? "Only editors can create diagrams"
                  : "Create new diagram"
              }
            >
              Create Diagram
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;
