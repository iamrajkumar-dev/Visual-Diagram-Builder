import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useMode } from "../context/modeContext";
import type { EditorMode } from "../context/modeContext";
import { useTheme } from "../context/themeContext";

const MODE_LABELS: Record<EditorMode, { title: string; subtitle: string }> = {
  Editing: { title: "Editing", subtitle: "Make changes" },
  Viewing: { title: "Viewing", subtitle: "Read-only" },
};

const Header: React.FC = () => {
  const { appUser, logout } = useAuth();
  const location = useLocation();
  const { mode, setMode } = useMode();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (appUser?.role === "Viewer" && mode !== "Viewing") {
      setMode("Viewing");
    }
  }, [appUser, mode, setMode]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (location.pathname === "/login") return null;

  const changeMode = (m: EditorMode) => {
    if (appUser?.role === "Viewer" && m !== "Viewing") {
      setMode("Viewing");
      setOpen(false);
      return;
    }
    setMode(m);
    setOpen(false);
  };

  return (
    <header
      className="app-header"
      role="banner"
      style={{
        background: "var(--card-bg)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        className="header-inner"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div className="brand" style={{ flex: "0 0 auto" }}>
          <NavLink
            to="/"
            className="brand-link"
            style={{
              color: "var(--text-color)",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Linkcraft
          </NavLink>
        </div>

        <nav
          className="nav"
          style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/editor/new"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            New Diagram
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>
        </nav>

        <div
          className="user-actions"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            className="mode-dropdown"
            ref={dropdownRef}
            style={{ position: "relative" }}
          >
            <button
              className="mode-button"
              onClick={() => setOpen((s) => !s)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Select editor mode"
              style={{
                background: "var(--card-bg)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 120,
                cursor: "pointer",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>
                  {MODE_LABELS[mode].title}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>
                  {MODE_LABELS[mode].subtitle}
                </div>
              </div>
              <div style={{ marginLeft: "auto", opacity: 0.8 }}>▾</div>
            </button>

            {open && (
              <div
                className="mode-menu"
                role="menu"
                aria-label="Editor mode menu"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 220,
                  boxShadow: "0 8px 24px rgba(12,20,40,0.08)",
                  zIndex: 120,
                }}
              >
                {(["Editing", "Viewing"] as EditorMode[]).map((m) => {
                  const disabled =
                    appUser?.role === "Viewer" && m !== "Viewing";
                  const active = m === mode;
                  return (
                    <button
                      key={m}
                      role="menuitem"
                      onClick={() => changeMode(m)}
                      disabled={disabled}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 6,
                        background: active
                          ? "var(--accent-color)"
                          : "transparent",
                        color: active ? "#fff" : "var(--text-color)",
                        border: "none",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.6 : 1,
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>
                          {MODE_LABELS[m].title}
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.85 }}>
                          {MODE_LABELS[m].subtitle}
                        </div>
                      </div>
                      <div>{active ? "✓" : ""}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
            style={{
              background: "var(--card-bg)",
              color: "var(--text-color)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {appUser ? (
            <>
              <div
                className="user-info"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  className="user-email"
                  title={appUser.email || ""}
                  style={{ fontWeight: 600 }}
                >
                  {appUser.email?.split("@")[0] ?? "User"}
                </div>
                <div
                  className="user-role"
                  style={{ fontSize: 12, opacity: 0.8 }}
                >
                  {appUser.role}
                </div>
              </div>
              <button
                className="btn-logout"
                onClick={logout}
                style={{
                  background: "var(--accent-color)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="nav-link"
              style={{ color: "var(--text-color)" }}
            >
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
