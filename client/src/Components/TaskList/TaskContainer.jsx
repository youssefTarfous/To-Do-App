// import { useContext } from "react";
// import { TasksContext } from "../../context/TaskProvider";
// import TaskDisplay from "./TaskDisplay";

// const TaskContainer = () => {
//   const {
//     state: { tasks },
//   } = useContext(TasksContext);

//   // Filter out duplicates based on _id
//   const uniqueTasks = tasks.filter(
//     (task, index, self) =>
//       index === self.findIndex((t) => t._id === task._id)
//   );

//   return (
//     <>
//       {uniqueTasks.length === 0 ? (
//         <p className="text-center text-gray-300">No tasks available</p>
//       ) : (
//         <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//           {uniqueTasks.map((task) => (
//             <TaskDisplay key={task._id} task={task} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default TaskContainer;



import { useContext } from "react";
import { TasksContext } from "../../context/TaskProvider";
import TaskDisplay from "./TaskDisplay";

const TaskContainer = () => {
  const {
    state: { tasks },
  } = useContext(TasksContext);
  console.log(tasks);
  return (
    <>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-300">No tasks available</p>
      ) : (
        <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {tasks.map((task) => {
            return <TaskDisplay key={task._id} task={task} />;
          })}
        </div>
      )}
    </>
  );
};

export default TaskContainer;
