import { TransBankIcon } from "@/components/icons/tbk-icon";
import {
  FaCcStripe,
  FaTelegram,
  LiaGripLinesVerticalSolid,
  RiBracesFill,
  RiPaypalFill,
  RiSlackFill,
  RiWhatsappLine,
  SiBinance,
  SiMaildotru,
  SiMercadopago,
  TbAmpersand,
} from "../index";

import { FiservIcon } from "@/components/icons/fiserv-icon";
import { RiFileUnknowFill } from "react-icons/ri";

export const onDragStart = (event: any, nodeType: any) => {
  event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeType));
  event.dataTransfer.effectAllowed = "move";
};

export const getIconComponent = (icon: String) => {
  switch (icon.toLowerCase()) {
    case "slack":
      return RiSlackFill;
    case "whatsapp":
      return RiWhatsappLine;
    case "stripe":
      return FaCcStripe;
    case "telegram":
      return FaTelegram;
    case "mercadopago":
      return SiMercadopago;
    case "transbank":
      return TransBankIcon;
    case "fiserv":
      return FiservIcon;
    case "paypal":
      return RiPaypalFill;
    case "condition":
      return RiBracesFill;
    case "and":
      return TbAmpersand;
    case "or":
      return LiaGripLinesVerticalSolid;
    case "binance":
      return SiBinance;
    case "email":
      return SiMaildotru;
    case "ampersand":
      return TbAmpersand;
    case "vertical":
      return LiaGripLinesVerticalSolid;
    case "braces":
      return RiBracesFill;
    default:
      return RiFileUnknowFill;
  }
};

export const fieldIntoReadable = (field: string) => {
  return field
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
};

let id = 1;
export const getId = () => `bridge_${id++}`;

const buildConditions: any = (rule: any, node: any, nodes: any, edges: any) => {
  if (node.type !== "condition" && node.type !== "logical") {
    return node;
  }

  if (node.type === "condition") {
    rule["conditions"].push(node.data.condition);
  } else if (node.type === "logical") {
    rule["conditionOperators"].push(node.data.name);
  }

  const nextNode = getNextConnectedNode(node, edges, nodes);

  if (typeof nextNode === "undefined") {
    return node;
  }
  return buildConditions(rule, nextNode, nodes, edges);
};

const getNextConnectedNode = (node: any, edges: any, nodes: any) => {
  return getNextConnectedNodes(node, edges, nodes)[0];
};

const getNextConnectedNodes = (node: any, edges: any, nodes: any) => {
  if (typeof node === "undefined") {
    return node;
  }
  return edges
    .filter(
      (edge: any) => edge.source === node.id && edge.sourceHandle !== "fallback"
    )
    .map((edge: any) => nodes.find((node: any) => node.id === edge.target));
};

interface Rule {
  name?: string;
  conditions?: any[];
  conditionOperators?: string[];
  nextRules?: Rule[];
  task?: any;
}

interface Payload {
  name?: string;
  shopId?: number;
  active?: boolean;
  rootRule?: Rule;
}

const getFallbackTask = (node: any, edges: any, nodes: any) => {
  const fallbackEdge = edges.find(
    (edge: any) => edge.source === node.id && edge.sourceHandle === "fallback"
  );
  if (typeof fallbackEdge === "undefined") {
    return undefined;
  }
  return nodes.find((node: any) => node.id === fallbackEdge.target);
};

const buildNextRule = (node: any, edges: any, nodes: any) => {
  const rule: Rule = {};
  rule["name"] = node.data.name;
  rule["conditions"] = [];
  rule["conditionOperators"] = [];
  rule["nextRules"] = [];
  rule["task"] = {};
  const taskNode = buildConditions(rule, node, nodes, edges);
  if (typeof taskNode === "undefined") {
    return rule;
  }
  const fallbackTask = getFallbackTask(taskNode, edges, nodes);
  let fallback = undefined;
  if (typeof fallbackTask !== "undefined") {
    fallback = {
      type: fallbackTask.data.type,
      name: fallbackTask.data.name,
      description: fallbackTask.data.description,
      isAsync: fallbackTask.data.isAsync,
      taskParams: { parameters: fallbackTask.data.parameter },
      category: fallbackTask.node_type,
      node_id: fallbackTask.id,
    };
  }
  rule["task"] = {
    type: taskNode.data.type,
    name: taskNode.data.name,
    description: taskNode.data.description,
    isAsync: taskNode.data.isAsync,
    taskParams: { parameters: taskNode.data.parameter },
    category: taskNode.node_type,
    fallback: fallback,
    node_id: taskNode.id,
  };
  const nextRuleNodes = getNextConnectedNodes(taskNode, edges, nodes);
  if (typeof nextRuleNodes === "undefined" || nextRuleNodes.length === 0) {
    return rule;
  }
  nextRuleNodes.forEach((nextRuleNode: any) => {
    rule["nextRules"].push(buildNextRule(nextRuleNode, edges, nodes));
  });
  return rule;
};

export const buildJson = (
  connectedNodes: any,
  flowName: any,
  edges: any,
  nodes: any,
  isActive: boolean
) => {
  const payload: Payload = {};
  payload["name"] = flowName;
  payload["active"] = isActive;
  payload["rootRule"] = {};
  payload["rootRule"]["name"] = "root";
  payload["rootRule"]["conditions"] = [];
  payload["rootRule"]["conditionOperators"] = [];
  payload["rootRule"]["nextRules"] = [];
  connectedNodes.forEach((node: any) => {
    payload["rootRule"]!["nextRules"]!.push(buildNextRule(node, edges, nodes));
  });
  return payload;
};
