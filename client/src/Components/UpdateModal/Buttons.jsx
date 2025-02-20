import { useTasks } from "../../context/TaskProvider";

const Buttons = () => {
  const { dispatch } = useTasks();
  return (
    <div className="flex justify-between ">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "CANCEL_UPDATE" })}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
};

export default Buttons;
