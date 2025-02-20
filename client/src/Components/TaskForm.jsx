import { useTasks } from "../context/TaskProvider";
import { motion } from "framer-motion";
import { formatDate } from "../utils/DateUtils";
const TaskForm = () => {
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
  const Formvariants = {
    hidden: {
      opacity: 0,
      x: "-50vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        duration: 0.3,
        delay: 0.1,
      },
    },
  };
  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow:
        "0px 0px 8px rgba(147, 51, 234, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.4)",
      boxShadow:
        "0px 0px 8px rgba(147, 51, 234, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.4)",
    },
  };
  const {
    state: { task },
    dispatch,
  } = useTasks();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date before dispatching
    dispatch({ type: "FORMAT_DATE", payload: formatDate(task.due) });

    try {

      // Sending the task data to the server
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      // Check if the response is successful before parsing JSON
      if (response.ok) {
        const newTask = await response.json(); // Parse response body into JSON
        // Dispatch the new task to update the state
        dispatch({ type: "ADD_TASK", payload: newTask });
      } else {
        // If the response is not successful, log the error details
        const errorDetails = await response.text(); // Or `response.json()` if error returns JSON
        console.error("Error creating task:", errorDetails);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <motion.form
      variants={Formvariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className=" flex items-center justify-center  w-full max-w-xl mx-auto overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-50"
    >
      <motion.div
        variants={componentsVaraints}
        initial="hidden"
        animate="visible"
        className="container flex flex-col items-center justify-center gap-3 p-4 "
      >
        <h1 className="w-full text-4xl font-bold text-cyan-50 text-center">
          Add a New Task
        </h1>

        <div className="w-full flex justify-center items-center flex-col">
          <label
            htmlFor="title"
            className="block text-white font-medium mb-2 text-2xl "
          >
            Task Title :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-sky-50"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="w-full flex justify-center items-center flex-col">
          <label
            htmlFor="description"
            className="block text-white text-2xl font-medium mb-2"
          >
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-2xl text-sky-50"
            placeholder="Enter task description"
          ></textarea>
        </div>

        {/* Due Date */}
        <div className="w-full flex justify-center items-center flex-col">
          <label
            htmlFor="due"
            className="block text-white font-medium text-2xl mb-2"
          >
            Due Date :
          </label>
          <input
            type="date"
            id="due"
            name="due"
            value={task.due}
            onChange={handleChange}
            className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-sky-50"
            required
          />
        </div>

        {/* Priority */}
        <div className="w-full flex justify-center items-center flex-col">
          <label
            htmlFor="priority"
            className="block text-white font-medium text-2xl mb-2"
          >
            Priority :
          </label>
          <select
            name="priority"
            className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-sky-50"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="low" className="text-cyan-50">
              Low
            </option>
            <option value="medium" className="text-cyan-50">
              Medium
            </option>
            <option value="high" className="text-cyan-50">
              High
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          type="submit"
          className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-cyan-50 hover:bg-cyan-900"
        >
          Add Task
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default TaskForm;
