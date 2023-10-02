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

  const setRuleNodesAndEdges = (rule: any, xPos: number, yPos: number) => {
    if (!rule) return;
    const conditions = rule.conditions;
    const conditionOperators = rule.conditionOperators;
    const task = rule.task;
    const nextRules = rule.nextRules;

    let lastXPos = xPos;
    const getEdgeId = () => {
      edgeId++;
      return edgeId.toString();
    };

    const hasConditionOperators = () =>
      conditionOperators && conditionOperators.length > 0;

    const hasConditions = () => conditions && conditions.length > 0;

    const getNextConditionPos = (index: number) => {
      lastXPos += 250;
      if (index % 2 != 0) lastXPos += 250;
      return { x: lastXPos, y: yPos };
    };

    const getNextTaskPos = () => {
      lastXPos += hasConditions() ? 400 : 250;
      return { x: lastXPos, y: yPos - 68 };
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

    if (task) {
      const taskNode: bridge.Node = {
        id: utils.getId(),
        type: getTaskNodeType(task.type),
        position: getNextTaskPos(),
        data: {
          name: task.name,
          type: task.type,
          description: task.description,
          isAsync: task.isAsync,
          parameter: task.taskParams.parameters,
          icon: utils.getIconComponent(task.name),
        },
      };
      nodes.push(taskNode);
      edges.push({
        id: getEdgeId(),
        source:
          nodes[hasConditionOperators() ? nodes.length - 3 : nodes.length - 2]
            .id,
        target: taskNode.id,
        animated: true,
      });
    }
    nextRules.forEach((rule: any) => {
      setRuleNodesAndEdges(rule, lastXPos + 50, yPos + 85);
    });
  };

  rootRule.nextRules.forEach((rule: any, index: number) => {
    setRuleNodesAndEdges(rule, 100, 250 * (index + 1));
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

  if (isRequestLoading) return <>Loading...</>;

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
    />
  );
}
