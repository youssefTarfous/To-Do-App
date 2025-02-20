import { useEffect, useReducer } from "react";
import TaskForm from "./Components/TaskForm.jsx";
import TaskList from "./Components/TaskList.jsx";
import DeleteTask from "./Components/DeleteTask.jsx";
import { motion } from "framer-motion";
import "./index.css"
import {
  backgroundVariants,
  divVariants,
  listVariants,
} from "./animation/Motion.js";
import { reducer } from "./hooks/useStateManager.js";
import axios from "axios";
import { initialStateTasks, TaskProvider } from "./context/TaskProvider.jsx";
import { formatDate } from "./utils/DateUtils.js";
import UpdateTask from "./Components/UpdateTask.jsx";
import TaskSummary from "./Components/TaskSummary.jsx";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialStateTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "LOADING_START" });
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        const formattedTasks = response.data.map((task) => ({
          ...task,
          due: formatDate(task.due),
        }));
        dispatch({ type: "FETCH_SUCCESS", payload: formattedTasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
    fetchTasks();
  }, []);

  const userPoints = {
    low: 5,
    medium: 15,
    high: 25,
  };

  const pointCalculator = (tasks) => {
    let result = 0;
    tasks.forEach((task) => {
      result += task.isFinished ? userPoints[task.priority] : 0;
    });
    return result;
  };

  return (
    <motion.div
      variants={backgroundVariants}
      animate="moving"
      className="min-h-screen font-inter flex justify-center items-center bg-gradient-to-tr from-cyan-500 via-blue-500 to-blue-700 p-4"
    >
      <TaskProvider state={state} dispatch={dispatch}>
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="w-full sm:w-4/5 min-h-[80vh] overflow-auto bg-cyan-950 rounded-3xl container shadow-lg shadow-cyan-900 p-4"
        >
          {/* Task Summary at the top */}
          <div className="w-full mb-4">
            <TaskSummary
              tasks={state.tasks}
              pointCalculator={pointCalculator}
            />
          </div>

          {/* Divider between TaskForm and TaskList */}
          <motion.div
            variants={divVariants}
            className="w-full h-[1px] bg-gray-200 mb-4"
          ></motion.div>

          {/* TaskForm and TaskList side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 ">
              <TaskList />
            </div>
            <motion.div
              variants={divVariants}
              className="w-full h-[1px] bg-cyan-50 lg:hidden mb-4"
            ></motion.div>
            <div className="flex flex-col gap-4">
              <TaskForm />
              <UpdateTask />
              <DeleteTask />
            </div>
          </div>
        </motion.div>
      </TaskProvider>
    </motion.div>
  );
};

export default App;
