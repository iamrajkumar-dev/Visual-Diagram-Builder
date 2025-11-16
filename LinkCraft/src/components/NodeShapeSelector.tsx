import React, { useCallback } from "react";

type NodeShape = "rectangle" | "circle" | "ellipse" | "square";

interface NodeShapeSelectorProps {
  selectedNodeShape: NodeShape | null;
  setSelectedNodeShape: (shape: NodeShape | null) => void;
  onAddNode: (shape?: NodeShape) => void;
}

const NodeShapeSelector: React.FC<NodeShapeSelectorProps> = ({
  selectedNodeShape,
  setSelectedNodeShape,
  onAddNode,
}) => {
  const handleShapeClick = useCallback(
    (shape: NodeShape) => {
      setSelectedNodeShape(shape);
      onAddNode(shape);
    },
    [setSelectedNodeShape, onAddNode]
  );

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        Node Shape
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {(["rectangle", "circle", "ellipse", "square"] as const).map(
          (shape) => (
            <button
              key={shape}
              onClick={() => handleShapeClick(shape)}
              style={{
                padding: 8,
                borderRadius: 6,
                border:
                  selectedNodeShape === shape
                    ? "2px solid var(--accent)"
                    : "1px solid var(--border)",
                background:
                  selectedNodeShape === shape
                    ? "var(--glass-2)"
                    : "transparent",
                color: "var(--text)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 12,
                transition: "all 0.2s",
              }}
            >
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default NodeShapeSelector;
