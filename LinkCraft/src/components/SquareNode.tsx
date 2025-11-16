import React, { useState } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { useNodeUpdate } from "./DiagramCanvas";

interface SquareNodeProps {
  data: {
    label?: string;
  };
  id?: string;
  isConnectable?: boolean;
  selected?: boolean;
}

const SquareNode: React.FC<SquareNodeProps> = ({
  data,
  id,
  isConnectable,
  selected,
}) => {
  const onUpdateLabel = useNodeUpdate();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    data.label?.split("\n")[0] || "Node"
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onUpdateLabel && id && editValue.trim()) {
      onUpdateLabel(id, editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditValue(data.label?.split("\n")[0] || "Node");
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 4,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text)",
        width: "100%",
        height: "100%",
        fontSize: 12,
        fontWeight: 500,
        position: "relative",
        cursor: isEditing ? "text" : "default",
        aspectRatio: "1 / 1",
      }}
      onDoubleClick={handleDoubleClick}
    >
      <NodeResizer isVisible={selected} minWidth={60} minHeight={60} />

      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable !== false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable !== false}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable !== false}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable !== false}
      />

      {isEditing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            border: "none",
            background: "transparent",
            color: "var(--text)",
            fontSize: 12,
            fontWeight: 500,
            width: "90%",
            textAlign: "center",
            outline: "none",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span>{editValue}</span>
      )}
    </div>
  );
};

export default SquareNode;
