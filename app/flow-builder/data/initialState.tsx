import { Node } from "reactflow";
import { FaFlagCheckered } from "react-icons/fa";

export const initialNodes: Node[] = [
  {
    id: "bridge_0",
    type: "root",
    data: { label: "root", icon: FaFlagCheckered },
    position: { x: 250, y: 5 },
  },
];
