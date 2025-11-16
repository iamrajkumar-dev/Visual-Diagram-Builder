import { useCallback, useState, useEffect } from "react";
import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  XYPosition,
} from "@xyflow/react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from "@xyflow/react";

type NodeShape = "rectangle" | "circle" | "ellipse" | "square";

export function useDiagramState(
  initialNodes: Node[] = [],
  initialEdges: Edge[] = []
) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeShape, setSelectedNodeShape] = useState<NodeShape | null>(
    null
  );

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          id: `e_${Date.now()}`,
          markerEnd: { type: MarkerType.Arrow },
          animated: true,
        } as Edge,
        eds
      )
    );
  }, []);

  const addNode = useCallback(
    (shapeToAdd?: NodeShape) => {
      const shape = shapeToAdd || selectedNodeShape || "rectangle";
      const id = `n_${Date.now()}`;
      const pos: XYPosition = { x: 250, y: 200 + nodes.length * 80 };

      const dimensions: { width?: number; height?: number } = {};
      if (shape === "rectangle") {
        dimensions.width = 120;
        dimensions.height = 60;
      } else if (shape === "circle" || shape === "square") {
        dimensions.width = 80;
        dimensions.height = 80;
      } else if (shape === "ellipse") {
        dimensions.width = 140;
        dimensions.height = 70;
      }

      const nodeData: { label: string } = {
        label: `${shape.charAt(0).toUpperCase() + shape.slice(1)} ${
          nodes.length + 1
        }`,
      };

      const newNode: Node = {
        id,
        position: pos,
        data: nodeData,
        type: shape,
        ...dimensions,
      };

      setNodes((prev) => prev.concat(newNode));
    },
    [nodes.length, selectedNodeShape]
  );

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
    );
  }, []);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n))
    );
  }, []);

  const undoEdge = useCallback(() => {
    setEdges((e) => e.slice(0, -1));
  }, []);

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNodeShape,
    setSelectedNodeShape,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    updateNodeLabel,
    undoEdge,
  };
}
