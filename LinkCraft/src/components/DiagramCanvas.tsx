import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  Node,
  Edge,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import RectangleNode from "./RectangleNode";
import CircleNode from "./CircleNode";
import EllipseNode from "./EllipseNode";
import SquareNode from "./SquareNode";

export const NodeUpdateContext = createContext<
  ((id: string, label: string) => void) | undefined
>(undefined);

export const useNodeUpdate = () => useContext(NodeUpdateContext);

interface DiagramCanvasProps {
  nodes: Node[];
  edges: Edge[];
  isEditor: boolean;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onUpdateNodeLabel?: (id: string, label: string) => void;
}

const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  nodes,
  edges,
  isEditor,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onUpdateNodeLabel,
}) => {
  const rfInstance = useRef<ReactFlowInstance | null>(null);

  const nodeTypes = useMemo(
    () => ({
      rectangle: RectangleNode,
      circle: CircleNode,
      ellipse: EllipseNode,
      square: SquareNode,
    }),
    []
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    rfInstance.current = instance;
    setTimeout(() => instance.fitView?.({ padding: 0.1 }), 100);
  }, []);

  return (
    <main className="canvas-area" style={{ position: "relative" }}>
      <NodeUpdateContext.Provider value={onUpdateNodeLabel}>
        <ReactFlowProvider>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={isEditor ? onNodesChange : undefined}
              onEdgesChange={isEditor ? onEdgesChange : undefined}
              onConnect={isEditor ? onConnect : undefined}
              onInit={onInit}
              fitView
              nodesDraggable={isEditor}
              nodesConnectable={isEditor}
              panOnDrag={isEditor}
              zoomOnScroll={false}
              panOnScroll={true}
              selectionOnDrag={isEditor}
              style={{
                width: "100%",
                height: "100%",
                background: "var(--bg)",
              }}
            >
              <Background
                gap={12}
                size={2}
                color="var(--accent)"
                style={{ opacity: 0.3 }}
              />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </NodeUpdateContext.Provider>
    </main>
  );
};

export default DiagramCanvas;
