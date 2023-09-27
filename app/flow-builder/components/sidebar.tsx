import React, { ReactNode } from "react";
import { useQuery } from "react-query";
import * as util from "../utils/util";
import { IconType } from "react-icons/lib";

const fetchTasks = async () =>
  fetch("http://localhost:8082/tasks").then((res) => res.json());

const Icon = ({ name }: any) => {
  const Icon: IconType = util.getIconComponent(name)!;
  return <Icon className="text-2xl" />;
};

const Sidebar = ({ onSidebarClick }: any) => {
  const { isLoading, error, data } = useQuery("tasks", fetchTasks);

  if (isLoading) return "Loading...";

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

  return (
    <div className="text-white flex flex-col ">
      <div className="flex flex-col p-5 rounded-lg bg-content1">
        {tasks.map((task: any, taskIndex: any) => (
          <div
            className="cursor-pointer hover:bg-neutral-800 rounded-full p-4"
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
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
