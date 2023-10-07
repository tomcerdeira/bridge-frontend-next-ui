import { Node } from "reactflow";
import { CiPlay1 } from "react-icons/ci";

export const initialNodes: Node[] = [
  {
    id: "bridge_0",
    type: "root",
    data: { name: "Start", icon: CiPlay1 },
    position: { x: 200, y: 400 },
  },
];
