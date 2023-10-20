"use client";
import { useFlowRetrieve, useFlowTasks } from "@/src/api/flow-builder";
import FlowBuilderPage from "@/app/builder/page";
import { initialNodes } from "@/app/builder";
import * as bridge from "@/app/builder";
import * as utils from "@/app/builder/utils/util";
import { useEffect, useState } from "react";

let edgeId = 0;

const buildNodesAndEdges = (rootRule: any, getTaskNodeType: any) => {
  const nodes: bridge.Node[] = [];
  const edges: bridge.Edge[] = [];
  nodes.push(initialNodes[0]);

  const setRuleNodesAndEdges = (
    rule: any,
    xPos: number,
    yPos: number,
    lastTaskId: string
  ) => {
    if (!rule || lastTaskId === "") return;
    const conditions = rule.conditions;
    const conditionOperators = rule.conditionOperators;
    const task = rule.task;
    const nextRules = rule.nextRules;

    let lastXPos = xPos;
    const getEdgeId = () => {
      edgeId++;
      return edgeId.toString();
    };
    conditionOperators && conditionOperators.length > 0;

    const hasConditions = () => conditions && conditions.length > 0;

    const getNextConditionPos = (index: number) => {
      lastXPos += 350;
      if (index % 2 != 0) lastXPos += 250;
      return { x: lastXPos, y: yPos };
    };

    const getNextTaskPos = () => {
      lastXPos += hasConditions() ? 550 : 350;
      return { x: lastXPos, y: yPos - 70 };
    };

    const getNextOperatorPos = () => {
      const correctedXPos = lastXPos / 1.15;
      return { x: correctedXPos, y: yPos + 10 };
    };

    if (conditions && conditions.length > 0) {
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const conditionNode: bridge.Node = {
          id: utils.getId(),
          type: "condition",
          position: getNextConditionPos(i),
          data: {
            condition: condition,
            name: "Condition",
            type: "condition",
          },
        };
        nodes.push(conditionNode);
        if (i == 0) {
          edges.push({
            id: getEdgeId(),
            source: nodes[0].id,
            target: conditionNode.id,
            animated: true,
          });
        }
        if (i != 0 && i % 2 != 0) {
          const conditionOperatorNode: bridge.Node = {
            id: utils.getId(),
            type: "logical",
            position: getNextOperatorPos(),
            data: {
              name: conditionOperators[Math.floor(i / 2)],
              type: "logical",
            },
          };
          nodes.push(conditionOperatorNode);
          edges.push({
            id: getEdgeId(),
            source: nodes[nodes.length - 3].id,
            target: conditionOperatorNode.id,
            animated: true,
          });
          edges.push({
            id: getEdgeId(),
            source: conditionOperatorNode.id,
            target: nodes[nodes.length - 2].id,
            animated: true,
          });
        }
      }
    }

    let nextTaskNodeId = "";

    if (task) {
      const taskNodePosition = getNextTaskPos();

      const taskNode: bridge.Node = {
        id: utils.getId(),
        type: getTaskNodeType(task.type),
        position: taskNodePosition,
        data: {
          name: task.name,
          type: task.type,
          description: task.description,
          isAsync: task.isAsync,
          parameter: task.taskParams.parameters,
          icon: utils.getIconComponent(task.name),
        },
      };
      nextTaskNodeId = taskNode.id;
      nodes.push(taskNode);
      if (!hasConditions()) {
        edges.push({
          id: getEdgeId(),
          source: lastTaskId,
          target: taskNode.id,
          animated: true,
        });
      } else {
        edges.push({
          id: getEdgeId(),
          source: nodes[nodes.length - 2].id,
          target: taskNode.id,
          animated: true,
        });
      }

      const fallback = task.fallback;
      if (fallback) {
        const fallbackNodePosition = getNextTaskPos();

        const fallbackNode: bridge.Node = {
          id: utils.getId(),
          type: getTaskNodeType(fallback.type),
          position: {
            x: fallbackNodePosition.x,
            y: fallbackNodePosition.y + 200,
          },
          data: {
            name: fallback.name,
            type: fallback.type,
            description: fallback.description,
            isAsync: fallback.isAsync,
            parameter: fallback.taskParams.parameters,
            icon: utils.getIconComponent(fallback.name),
          },
        };
        nodes.push(fallbackNode);
        edges.push({
          id: getEdgeId(),
          sourceHandle: "fallback",
          source: taskNode.id,
          target: fallbackNode.id,
          animated: true,
          type: "fallback",
        });
      }
    }

    nextRules.forEach((rule: any, index: number) => {
      setRuleNodesAndEdges(
        rule,
        lastXPos + 50,
        yPos * (1 + index),
        nextTaskNodeId
      );
    });
  };

  rootRule.nextRules.forEach((rule: any, index: number) => {
    setRuleNodesAndEdges(rule, 100, 500 * (index + 1), initialNodes[0].id);
  });

  return { nodes, edges };
};

export default function FlowBuilderEditPage({
  params: { flowId },
}: {
  params: { flowId: string };
}) {
  const { getFlow } = useFlowRetrieve(flowId);
  const { getTasks } = useFlowTasks();
  const [isRequestLoading, setRequestLoading] = useState(true);
  const [flow, setFlow] = useState();
  const [tasks, setTasks] = useState([]);

  const retrieveFlow = async () => {
    setRequestLoading(true);
    const flow = await getFlow();
    const tasks = await getTasks();
    setFlow(flow);
    setTasks(tasks);
    setRequestLoading(false);
  };

  useEffect(() => {
    retrieveFlow();
  }, []);

  if (isRequestLoading)
    return (
      <div className="flex flex-col h-full justify-center items-center gap-10">
        <div className="gap-2 flex flex-col md:flex-row justify-center">
          <p style={{ fontSize: "24px" }}>Cargando...</p>
        </div>
      </div>
    );

  const getTaskNodeType = (taskType: string) => {
    const task = tasks.find((task) => task.type === taskType);
    return task.category.toLowerCase();
  };

  const rootRule = flow.rootRule;
  const { nodes, edges } = buildNodesAndEdges(rootRule, getTaskNodeType);
  return (
    <FlowBuilderPage
      editNodes={nodes}
      editName={flow.name}
      editEdges={edges}
      flowId={flowId}
      active={flow.active}
    />
  );
}
