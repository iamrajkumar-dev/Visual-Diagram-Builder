import React from "react";
import type { Node } from "@xyflow/react";

interface NodesListProps {
  nodes: Node[];
  onDeleteNode: (nodeId: string) => void;
}

const NodesList: React.FC<NodesListProps> = ({ nodes, onDeleteNode }) => {
  return (
    <>
      <h4>Nodes</h4>
      <div>
        {nodes.length === 0 && <small>No nodes yet</small>}
        {nodes.map((n) => (
          <div
            key={n.id}
            className="card"
            style={{ marginBottom: 8, padding: 8 }}
          >
            <div
              style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}
            >
              id: {n.id}
            </div>
            <div
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 6,
                padding: 6,
                borderRadius: 4,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {(n.data as { label?: string })?.label ?? ""}
            </div>
            <button
              onClick={() => onDeleteNode(n.id)}
              style={{
                width: "100%",
                padding: 6,
                background: "var(--danger)",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default NodesList;
