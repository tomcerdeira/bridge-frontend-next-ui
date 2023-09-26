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
              onSidebarClick({ ...task, node_type: task.category })
            }
            key={taskIndex}
          >
            {<Icon name={task.name} />}
          </div>
        ))}
        {/* {categories.map((category, categoryIndex) => (
          <div className="flex flex-col gap-2 mb-3" key={categoryIndex}>
            <h2 className="text-lg ">{category.type}</h2>
            <div className="flex flex-row justify-around">
              {category.items.map((item, itemIndex) => (
                <div
                  className="cursor-pointer hover:bg-neutral-800 rounded-full p-4"
                  onClick={() =>
                    onSidebarClick({
                      ...item,
                      node_type: category.type.toLowerCase().split(" ")[0],
                    })
                  }
                  key={itemIndex}
                >
                  <item.icon className="text-2xl" />
                </div>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Sidebar;
