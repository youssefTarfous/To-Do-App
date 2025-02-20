import { useTasks } from "../../context/TaskProvider";
import Title from "./Title";
import Description from "./Description";
import DueDate from "./DueDate";
import Priority from "./Priority";
import Buttons from "./Buttons";
import { useEffect } from "react";
import { formatDate, formatDateUpdate } from "../../utils/DateUtils";
import { actions } from "../../hooks/Actions";

const UpdateModal = () => {
  const {
    state: { editedTask },
    dispatch,
  } = useTasks();
  const handleUpdate = async (e,updatedTask) => {
    e.preventDefault();
    console.log(e,updatedTask);
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const result = await response.json();
      console.log(result)
      console.log("Updated Task Payload:", result);
      if (response.ok) {
        console.log("Updated Task Payload:", result);
        dispatch({ type: actions.CONFIRM_UPDATE, payload: result });
      } else {
        console.error("Error updating task:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(() => {
    if (editedTask && editedTask.due) {
      const dateString = formatDate(editedTask.due);
      dispatch({
        type: "FORMAT_DATE_UPDATE",
        payload: formatDateUpdate(dateString),
      });
      console.log(editedTask);
    }
  }, [editedTask.due]);
  return (
    <form onSubmit={(e) => handleUpdate(e, editedTask)}>
      <h1 className="w-full text-4xl font-bold text-cyan-50 text-center">
        Edit Task Details
      </h1>
      <Title />
      <Description />
      <DueDate />
      <Priority />
      <Buttons />
    </form>
  );
};

export default UpdateModal;
