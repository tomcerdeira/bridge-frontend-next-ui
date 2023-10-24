import React, { useState, useEffect } from "react";
import { IconType } from "react-icons/lib";
import { Skeleton, Tooltip } from "@nextui-org/react";
import { categories } from "../data/categories";
import { conditions } from "../data/conditions";
import { useFlowTasks } from "@/src/api/flow-builder";
import * as util from "../utils/util";

const fetchTasks = async () =>
  fetch("http://localhost:8080/payment/private/tasks").then((res) =>
    res.json()
  );

const Icon = ({ name }: any) => {
  const Icon: IconType = util.getIconComponent(name)!;
  return <Icon className="text-2xl" />;
};

const Sidebar = ({ onSidebarClick }: any) => {
  const { getTasks } = useFlowTasks();
  const [isRequestLoading, setRequestLoading] = useState(true);
  const [data, setData] = useState([]);

  const retrieveTasks = async () => {
    const response = await getTasks();
    setData(response);
    setRequestLoading(false);
  };

  useEffect(() => {
    retrieveTasks();
  }, []);

  if (isRequestLoading)
    return (
      <div className="text-white flex flex-col ">
        <div className="flex flex-col p-5 rounded-lg bg-content1">
          <div className="p-4 flex flex-col gap-4">
            <Skeleton className="rounded-lg">{<Icon name="slack" />}</Skeleton>
            <Skeleton className="rounded-lg">{<Icon name="slack" />}</Skeleton>
            <Skeleton className="rounded-lg">{<Icon name="slack" />}</Skeleton>
            <Skeleton className="rounded-lg">{<Icon name="slack" />}</Skeleton>
          </div>
        </div>
      </div>
    );

  const tasks = data.map((task: any) => {
    return {
      ...task,
      name: task.name.toLowerCase().replace(/\s/g, ""),
      parameter: task.parameter.map((parameter: any) => {
        return {
          ...parameter,
          id: undefined,
        };
      }),
    };
  });

  const initialCondition = {
    field: conditions[0].field,
    operator: conditions[0].operators[0],
    value: conditions[0].values[0],
  };

  categories.forEach((category) => {
    const extendedCategory = {
      ...category,
      condition: initialCondition,
    };
    tasks.push(extendedCategory);
  });

  const taskCategories = tasks.reduce((acc: any, task: any) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  return (
    <div className="text-white flex flex-col">
      <div className="flex flex-col p-5 items-center ">
        {Object.keys(taskCategories).map(
          (category: any, categoryIndex: any) => (
            <div className="flex flex-col mt-2" key={categoryIndex}>
              <p className="capitalize font-fira text-sm text-center mb-1">
                {category.toLowerCase()}
              </p>
              <div className="flex flex-col items-center">
                {taskCategories[category].map((task: any, taskIndex: any) => (
                  <Tooltip
                    content={task.name}
                    placement="left"
                    className="capitalize font-fira"
                    key={taskIndex}
                  >
                    <div
                      className="cursor-pointer border-dashed border-2 mb-2 border-gray-800 hover:bg-neutral-800 rounded-xl p-4"
                      onClick={() =>
                        onSidebarClick({
                          ...task,
                          node_type: task.category.toLowerCase(),
                        })
                      }
                      key={taskIndex}
                    >
                      {<Icon name={task.name} />}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
