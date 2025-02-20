import React from "react";
import TaskFinished from "./TaskFinished";
import TaskUnFinished from "./TaskUnFinished";

const TaskHeader = ({ task }) => {
  return (
    <h3 className="text-lg font-semibold">
      {task.isFinished ? (
        <TaskFinished task={task} />
      ) : (
        <TaskUnFinished task={task} />
      )}
    </h3>
  );
};

export default TaskHeader;
