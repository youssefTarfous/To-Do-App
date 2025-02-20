import React from "react";
import { FaTasks } from "react-icons/fa";

const TaskListHeader = () => {
  return (
    <>
      <div className="text-4xl font-bold mb-4 text-center text-cyan-50 flex items-center justify-center gap-3">
        <FaTasks size={35} />
        <h1 className="">Task List</h1>
      </div>
    </>
  );
};

export default TaskListHeader;
