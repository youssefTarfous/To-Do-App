import { useTasks } from "../../context/TaskProvider";
import { formatDate, formatDateUpdate } from "../../utils/DateUtils";

const TaskActions = ({ task }) => {
  const { state, dispatch } = useTasks();
  const handleFinished = async (id) => {
    const taskToggled = state.tasks.find((task) => task._id === id);
    if (!taskToggled) return;

    const formattedDate = formatDateUpdate(taskToggled.due);

    dispatch({ type: "TASK_TOGGLED", payload: id });

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFinished: !taskToggled.isFinished,
          due: formattedDate, // Send updated date in correct format
        }),
      });

      const updatedTaskFromServer = await response.json();
      if (response.ok) {
        const formattedDateTask = formatDate(updatedTaskFromServer.due);
        dispatch({
          type: "UPDATE_TASK",
          payload: { ...updatedTaskFromServer, due: formattedDateTask },
        });
      } else {
        console.error("Error toggling task:", updatedTaskFromServer);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            console.log(state.editedTask,state.updateTaskId);
            dispatch({ type: "SHOW_MODAL_UPDATE", payload: task._id });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>

        <button
          onClick={() =>
            dispatch({ type: "SHOW_MODAL_DELETE", payload: task._id })
          }
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
      <label className="flex items-center gap-2 text-gray-300">
        <input
          type="checkbox"
          checked={task.isFinished}
          onChange={() => handleFinished(task._id)}
          className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-600 checkbox checkbox-success"
        />
        Finished
      </label>
    </div>
  );
};

export default TaskActions;
