import React from "react";

interface ActionButtonsProps {
  onUndoEdge: () => void;
  onSave: () => void;
  onBack: () => void;
  saving: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onUndoEdge,
  onSave,
  onBack,
  saving,
}) => {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 18, width: "100%" }}>
      <button onClick={onUndoEdge} className="btn-ghost" style={{ flex: 1 }}>
        Undo Edge
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="btn-primary"
        style={{ flex: 1 }}
      >
        {saving ? "Saving…" : "Save"}
      </button>
      <button onClick={onBack} className="btn-ghost" style={{ flex: 1 }}>
        Back
      </button>
    </div>
  );
};

export default ActionButtons;
