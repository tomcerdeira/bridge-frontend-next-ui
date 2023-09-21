"use client";
import { useCallback, useRef } from "react";
import * as bridge from "./index";
import { conditions } from "./data/conditions";
import * as util from "./utils/util";
import "reactflow/dist/style.css";
import { Button } from "@nextui-org/react";

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    bridge.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const defaultViewport: bridge.Viewport = { x: 200, y: 250, zoom: 0.8 };

  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge({ ...params, animated: true }, els)),
    [setEdges]
  );

  const onSidebarClick = (data: any) => {
    const position = { x: 0, y: 0 };
    const newNode = {
      id: util.getId(),
      type: data.node_type.toLowerCase(),
      position,
      data: {
        icon: util.getIconComponent(data.name),
        parameter: data.parameter,
        name: data.name,
        ...(data.node_type.toLowerCase() === "condition" && {
          condition: {
            field: conditions[0].field,
            operator: conditions[0].operators[0],
            value: conditions[0].values[0],
          },
        }),
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const buildConditions: any = (rule: any, node: any) => {
    if (node.type !== "condition" && node.type !== "logical_operator") {
      return node;
    }

    if (node.type === "condition") {
      rule["conditions"].push(node.data.condition);
    } else if (node.type === "logical_operator") {
      rule["conditionOperators"].push(node.data.name);
    }

    const nextNode = getNextConnectedNode(node);

    if (typeof nextNode === "undefined") {
      return node;
    }
    return buildConditions(rule, nextNode);
  };

  const getNextConnectedNode = (node: any) => {
    if (typeof node === "undefined") {
      return node;
    }
    return edges
      .filter((edge) => edge.source === node.id)
      .map((edge) => nodes.find((node) => node.id === edge.target))[0];
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

  const buildNextRule = (node: any) => {
    const rule: Rule = {};
    rule["name"] = node.data.name;
    rule["conditions"] = [];
    rule["conditionOperators"] = [];
    rule["nextRules"] = [];
    rule["task"] = {};
    const taskNode = buildConditions(rule, node);
    if (typeof taskNode === "undefined") {
      return rule;
    }
    rule["task"] = {
      type: "task_" + taskNode.data.name.toLowerCase(),
      parameters: taskNode.data.parameter,
    };
    const nextRuleNode = getNextConnectedNode(taskNode);
    if (typeof nextRuleNode === "undefined") {
      return rule;
    }
    rule["nextRules"].push(buildNextRule(nextRuleNode));
    return rule;
  };

  const buildJson = (connectedNodes: any) => {
    const payload: Payload = {};
    payload["name"] = "current flow";
    payload["shopId"] = 12;
    payload["active"] = true;
    payload["rootRule"] = {};
    payload["rootRule"]["name"] = "root";
    payload["rootRule"]["conditions"] = [];
    payload["rootRule"]["conditionOperators"] = [];
    payload["rootRule"]["nextRules"] = [];
    connectedNodes.forEach((node: any) => {
      payload["rootRule"]["nextRules"].push(buildNextRule(node));
    });
    console.log(payload);
    return payload;
  };

  const onSaveClick = () => {
    const rootNode = nodes.find((node) => node.id === "bridge_0");
    if (typeof rootNode === "undefined") return;
    const connectedNodes = edges
      .filter((edge) => edge.source === rootNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.target));
    const json = buildJson(connectedNodes);
    // Ready to be sent to the backend
  };

  return (
    <div className="flex flex-row h-full">
      <bridge.Sidebar onSidebarClick={onSidebarClick} />
      <div className="w-screen align-center" ref={reactFlowWrapper}>
        <bridge.ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          nodeTypes={bridge.nodeTypes}
        />
      </div>
      <div className="align-bottom">
        <Button variant="ghost" onClick={onSaveClick}>
          wohoo
        </Button>
      </div>
    </div>
  );
};

export default FlowBuilder;
