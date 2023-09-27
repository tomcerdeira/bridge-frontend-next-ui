"use client";
import { useCallback, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useFlowBuilder } from "@/src/api/flow-builder";
import { QueryClient, QueryClientProvider } from "react-query";
import { conditions } from "./data/conditions";
import * as bridge from "./index";
import * as util from "./utils/util";
import "reactflow/dist/style.css";

export default function FlowBuilderPage() {
  const queryClient = new QueryClient();
  const { buildFlow, error, isLoading } = useFlowBuilder();
  const [isRequestLoading, setRequestLoading] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [nodes, setNodes, onNodesChange] = bridge.useNodesState(
    bridge.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = bridge.useEdgesState([]);
  const defaultViewport: bridge.Viewport = { x: 0, y: 0, zoom: 0.8 };
  const onConnect = useCallback(
    (params: bridge.Edge | bridge.Connection) =>
      setEdges((els) => bridge.addEdge({ ...params, animated: true }, els)),
    [setEdges]
  );

  const onSidebarClick = (data: any) => {
    const position = { x: 250, y: 250 };
    const newNode = {
      id: util.getId(),
      type: data.node_type,
      position,
      data: {
        icon: util.getIconComponent(data.name),
        parameter: data.parameter,
        name: data.name,
        isAsync: data.isAsync,
        description: data.description,
        type: data.type,
        ...(data.node_type === "condition" && {
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
    if (node.type !== "condition" && node.type !== "logical") {
      return node;
    }

    if (node.type === "condition") {
      rule["conditions"].push(node.data.condition);
    } else if (node.type === "logical") {
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
      type: taskNode.data.type,
      name: taskNode.data.name,
      description: taskNode.data.description,
      isAsync: taskNode.data.isAsync,
      taskParams: { parameters: taskNode.data.parameter },
      category: taskNode.node_type,
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
    payload["name"] = flowName;
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
    return payload;
  };

  const onSaveClick = async () => {
    const rootNode = nodes.find((node) => node.id === "bridge_0");
    if (typeof rootNode === "undefined") return;
    const connectedNodes = edges
      .filter((edge) => edge.source === rootNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.target));
    const json = buildJson(connectedNodes);
    console.log(JSON.stringify(json));
    try {
      setRequestLoading(true);
      let flow = await buildFlow(json);
      console.log("Flow sent successfully, response is: ");
      console.log(flow);
    } catch (err) {
      console.log(err);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between gap-3">
        <Input
          type="email"
          placeholder="Sin título"
          variant="underlined"
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          className="ml-2 mt-2 font-fira"
        />
        <Button
          color="primary"
          className="font-fira mt-2 mr-2"
          isLoading={isRequestLoading}
          onClick={onSaveClick}
        >
          Guardar
        </Button>
      </div>
      <div className="flex grow flex-row items-center align-middle">
        <bridge.ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultViewport={defaultViewport}
          nodeTypes={bridge.nodeTypes}
        >
          {/* <bridge.Background gap={20} /> */}
        </bridge.ReactFlow>
        <QueryClientProvider client={queryClient}>
          <bridge.Sidebar onSidebarClick={onSidebarClick} />
        </QueryClientProvider>
      </div>
    </div>
  );
}
