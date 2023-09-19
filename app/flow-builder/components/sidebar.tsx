import React from "react";
import { categories } from "../data/categories";
const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col ml-4 rounded">
      <div className="flex flex-col">
        {categories.map((category, categoryIndex) => (
          <div className="flex flex-col gap-2 mb-3" key={categoryIndex}>
            <h2 className="text-lg">{category.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
