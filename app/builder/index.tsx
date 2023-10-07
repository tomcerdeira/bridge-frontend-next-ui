export {
  RiWhatsappLine,
  RiSlackFill,
  RiPaypalFill,
  RiBracesFill,
} from "react-icons/ri";
export type {
  Edge,
  Connection,
  Viewport,
  ReactFlowInstance,
  Node,
} from "reactflow";
export { FaCcStripe, FaFlagCheckered, FaTelegram } from "react-icons/fa";
export { SiMercadopago, SiBinance, SiMaildotru } from "react-icons/si";
export { TbAmpersand } from "react-icons/tb";
export { LiaGripLinesVerticalSolid } from "react-icons/lia";
export { ReactFlow, Background } from "reactflow";
export { addEdge, useNodesState, useEdgesState } from "reactflow";
export { default as Sidebar } from "./components/sidebar";
export { initialNodes } from "./data/initialState";
import * as node from "./components/nodes";

export const nodeTypes = {
  condition: node.ConditonNode,
  root: node.RootNode,
  query: node.ProcessorNode,
  processor: node.ProcessorNode,
  logical: node.LogicalNode,
  notification: node.NotificationNode,
};
