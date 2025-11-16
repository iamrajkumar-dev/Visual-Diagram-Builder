import React from "react";
import type { Edge } from "@xyflow/react";

interface EdgesListProps {
  edges: Edge[];
}

const EdgesList: React.FC<EdgesListProps> = ({ edges }) => {
  return (
    <>
      <h4>Edges</h4>
      <div>
        {edges.length === 0 && <small>No edges yet</small>}
        {edges.map((e) => (
          <div
            key={e.id}
            style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}
          >
            {e.source} → {e.target}
          </div>
        ))}
      </div>
    </>
  );
};

export default EdgesList;
