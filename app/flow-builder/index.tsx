export {
  RiWhatsappLine,
  RiSlackFill,
  RiPaypalFill,
  RiBracesFill,
} from "react-icons/ri";
export { FaCcStripe, FaFlagCheckered, FaTelegram } from "react-icons/fa";
export { SiMercadopago, SiBinance } from "react-icons/si";
export { TbAmpersand } from "react-icons/tb";
export { LiaGripLinesVerticalSolid } from "react-icons/lia";
export type { Edge, Connection, Viewport } from "reactflow";
export { ReactFlow } from "reactflow";
export { initialNodes, initialEdges } from "./data/initialState";
export { addEdge, useNodesState, useEdgesState } from "reactflow";
export { default as Sidebar } from "./components/sidebar";

import * as node from "./components/nodes";

export const nodeTypes = {
  condition: node.ConditonNode,
  root: node.RootNode,
  processor: node.ProcessorNode,
  logical: node.LogicalNode,
  notification: node.NotificationNode,
};
