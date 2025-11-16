import React from "react";
import type { Node, Edge } from "@xyflow/react";
import TitleEditor from "./TitleEditor";
import NodeShapeSelector from "./NodeShapeSelector";
import ActionButtons from "./ActionButtons";
import NodesList from "./NodesList";
import EdgesList from "./EdgesList";

type NodeShape = "rectangle" | "circle" | "ellipse" | "square";

interface DiagramInspectorProps {
  diagramId?: string;
  title: string;
  setTitle: (title: string) => void;
  selectedNodeShape: NodeShape | null;
  setSelectedNodeShape: (shape: NodeShape | null) => void;
  nodes: Node[];
  edges: Edge[];
  onAddNode: () => void;
  onDeleteNode: (nodeId: string) => void;
  onUndoEdge: () => void;
  onSave: () => void;
  onBack: () => void;
  saving: boolean;
}

const DiagramInspector: React.FC<DiagramInspectorProps> = ({
  diagramId,
  title,
  setTitle,
  selectedNodeShape,
  setSelectedNodeShape,
  nodes,
  edges,
  onAddNode,
  onDeleteNode,
  onUndoEdge,
  onSave,
  onBack,
  saving,
}) => {
  return (
    <aside className="inspector">
      <TitleEditor diagramId={diagramId} title={title} setTitle={setTitle} />

      <NodeShapeSelector
        selectedNodeShape={selectedNodeShape}
        setSelectedNodeShape={setSelectedNodeShape}
        onAddNode={onAddNode}
      />

      <ActionButtons
        onUndoEdge={onUndoEdge}
        onSave={onSave}
        onBack={onBack}
        saving={saving}
      />

      <hr />

      <NodesList nodes={nodes} onDeleteNode={onDeleteNode} />

      <hr />

      <EdgesList edges={edges} />
    </aside>
  );
};

export default DiagramInspector;
