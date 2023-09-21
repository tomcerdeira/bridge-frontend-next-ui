import React from "react";
import { categories } from "../data/categories";

const Sidebar = ({ onSidebarClick }: any) => {
  return (
    <div className="text-white flex flex-col ">
      <div className="flex flex-col p-5 rounded-lg text-left bg-content1">
        {categories.map((category, categoryIndex) => (
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
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
