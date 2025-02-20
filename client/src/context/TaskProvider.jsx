import React, { useContext } from "react";
import { initialTask, initialTaskUpdate} from "../hooks/useStateManager"; 
import { formatDate } from "../utils/DateUtils";

export const TasksContext = React.createContext();
export const HandlersContext = React.createContext();

export const useTasks = () => {
  return useContext(TasksContext);
};
export const useHandlers = () => {
  return useContext(HandlersContext);
};
export const initialStateTasks = {
  tasks: [],
  task: initialTask,
  editedTask: initialTaskUpdate,
  taskToggled: initialTaskUpdate, 
  loading: false,
  error: "",
  showModalDelete: false,
  showModalUpdate: false,
  deleteTaskId: "",
  updateTaskId: "",
};

export const TaskProvider = ({children,state,dispatch}) => {
  
  const {tasks,task,taskToggled} = state
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_CHANGE_UPDATE", payload: { name, value } });
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      console.log(response, id);
      if (response.ok) {
        dispatch({ type: "CONFIRM_DELETE", payload: id });
        console.log(tasks);
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FORMAT_DATE", payload: formatDate(task.due) });
      console.log(task.due);
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      if (response.ok) {
        dispatch({ type: "ADD_TASK", payload: newTask });
      } else {
        console.error("Error creating task:", newTask);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <TasksContext.Provider value={{state,dispatch}}>
      <HandlersContext.Provider
        value={{
          handleSubmit,
          confirmDelete,
          handleChangeUpdate
        }}
      >
        {children}
      </HandlersContext.Provider>
    </TasksContext.Provider>
  );
};
