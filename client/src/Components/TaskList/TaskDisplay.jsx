
import TaskDescription from "./TaskDescription";
import TaskHeader from "./TaskHeader";
import TaskActions from "./TaskActions";
import { motion } from "framer-motion";

const TaskDisplay = ({ task }) => {
  console.log(task)
  return (
    <div className="bg-gray-800 text-cyan-50 rounded-lg p-3 lg:p-4 mb-4 shadow-md border border-gray-700 hover:shadow-lg transition duration-300">
        {/* Task Display */}
        <motion.div
          key={task._id}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100vw", opacity: 0 }}
          className="flex items-center"
        >
          <div className="w-full min-w-0">
            <TaskHeader task={task} />
            <TaskDescription task={task} />
            <p className="text-sm text-gray-400 mt-2">Due: {task.due}</p>
          </div>
        </motion.div>
        {/* Action Buttons */}
        <TaskActions  task={task} />
    </div>
  );
};

export default TaskDisplay;
