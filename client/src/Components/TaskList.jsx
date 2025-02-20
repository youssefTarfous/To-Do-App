import TaskSummary from "./TaskSummary";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskProvider";
import TaskListHeader from "./TaskList/TaskListHeader";
import TaskContainer from "./TaskList/TaskContainer";

const TaskList = () => {
  const componentsVaraints = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
      },
    },
  };
  const listVariants = {
    hidden: {
      opacity: 0,
      x: "50vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center w-full max-w-xl max-h-full overflow-auto mx-auto"
    >
      <motion.div
        variants={componentsVaraints}
        initial="hidden"
        animate="visible"
        className="container max-h-full flex flex-col items-center justify-center gap-4 bg-cyan-950 rounded-lg  lg:p-6 shadow-lg"
      >
        <TaskListHeader />
        <TaskContainer />
      </motion.div>
    </motion.div>
  );
};
export default TaskList;
