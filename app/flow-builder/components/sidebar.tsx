import React from "react";
import { categories } from "../data/categories";
import { onDragStart } from "../utils/util";
const Sidebar = () => {
  return (
    <div className="text-white flex flex-col ">
      <div className="flex flex-col bg-content1 p-5 rounded-lg text-left">
        {categories.map((category, categoryIndex) => (
          <div className="flex flex-col gap-2 mb-3" key={categoryIndex}>
            <h2 className="text-lg ">{category.type}</h2>
            <div className="flex flex-row justify-around">
              {category.items.map((item, itemIndex) => (
                <div
                  className="cursor-grab hover:bg-neutral-800 rounded-full p-4 translate-x-0 translate-y-0 "
                  draggable
                  key={itemIndex}
                  onDragStart={(event) =>
                    onDragStart(event, {
                      node_type: category.type.split(" ")[0].toLowerCase(),
                      name: item.name.toLowerCase(),
                      parameter: item.parameter,
                    })
                  }
                >
                  <item.icon className="text-2xl" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
