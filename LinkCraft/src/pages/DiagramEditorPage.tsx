import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useMode } from "../context/modeContext";
import DiagramInspector from "../components/DiagramInspector";
import DiagramCanvas from "../components/DiagramCanvas";
import { useDiagramState } from "../hooks/useDiagramState";
import { useDiagramData } from "../hooks/useDiagramData";
import { useSaveDiagram } from "../hooks/useSaveDiagram";

const DiagramEditorPage: React.FC = () => {
  const { diagramId } = useParams<{ diagramId?: string }>();
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { mode } = useMode();

  const isEditor = appUser?.role === "Editor" && mode === "Editing";
  const isViewerMode = appUser?.role === "Viewer" || mode === "Viewing";

  const {
    title,
    setTitle,
    nodes: firestoreNodes,
    edges: firestoreEdges,
    loading,
  } = useDiagramData(diagramId);

  const {
    nodes,
    edges,
    selectedNodeShape,
    setSelectedNodeShape,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    updateNodeLabel,
    undoEdge,
  } = useDiagramState(firestoreNodes, firestoreEdges);

  const { saveDiagram, saving } = useSaveDiagram(diagramId, isEditor);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        !isViewerMode
      ) {
        const selectedNodes = nodes.filter(
          (n) => (n as unknown as { selected?: boolean }).selected
        );
        selectedNodes.forEach((node) => deleteNode(node.id));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, deleteNode, isViewerMode]);

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

  const handleSave = () => saveDiagram(title, nodes, edges);

  return (
    <div className="diagram-editor">
      {isEditor && (
        <DiagramInspector
          diagramId={diagramId}
          title={title}
          setTitle={setTitle}
          selectedNodeShape={selectedNodeShape}
          setSelectedNodeShape={setSelectedNodeShape}
          nodes={nodes}
          edges={edges}
          onAddNode={addNode}
          onDeleteNode={deleteNode}
          onUndoEdge={undoEdge}
          onSave={handleSave}
          onBack={() => navigate("/dashboard")}
          saving={saving}
        />
      )}

      <DiagramCanvas
        nodes={nodes}
        edges={edges}
        isEditor={isEditor}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onUpdateNodeLabel={updateNodeLabel}
      />
    </div>
  );
};

export default DiagramEditorPage;
