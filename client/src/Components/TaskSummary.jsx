
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskProvider";

const pointsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const TaskSummary = ({ pointCalculator }) => {
  const { state: { tasks } } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isFinished).length;
  const uncompletedTasks = totalTasks - completedTasks;

  const completedPercentage = totalTasks
    ? ((completedTasks / totalTasks) * 100).toFixed(1)
    : 0;
  const uncompletedPercentage = totalTasks
    ? ((uncompletedTasks / totalTasks) * 100).toFixed(1)
    : 0;

  const points = pointCalculator(tasks);
  const pointsPercentage = ((points / 1000) * 100).toFixed(1);

  // Dynamic Color Based on Completion %
  const progressColor = completedPercentage > 70
    ? "bg-green-100 text-green-700"
    : completedPercentage < 30
    ? "bg-red-100 text-red-700"
    : "bg-orange-100 text-orange-700";

  // Motivational Message Based on Progress
  const getMotivationMessage = () => {
    if (completedPercentage >= 80) return "🔥 You're on fire! Keep up the momentum!";
    if (completedPercentage >= 50) return "💪 Great job! Stay consistent.";
    if (completedPercentage > 0) return "🚀 Keep going! Small steps lead to big results.";
    return "👀 No tasks completed yet. Start now!";
  };

  return (
    <motion.div
      variants={pointsVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 w-full md:grid-cols-3 gap-6 p-6"
    >
      {/* Completed Tasks */}
      <motion.div
        variants={pointsVariants}
        className={`flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md ${progressColor}`}
      >
        <span className="text-lg font-semibold">✅ Completed Tasks</span>
        <span className="text-2xl font-bold">{completedTasks}</span>
        <span className="text-sm">Progress: {completedPercentage}%</span>
      </motion.div>

      {/* Uncompleted Tasks */}
      <motion.div
        variants={pointsVariants}
        className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md bg-orange-100 text-orange-700"
      >
        <span className="text-lg font-semibold">⏳ Uncompleted Tasks</span>
        <span className="text-2xl font-bold">{uncompletedTasks}</span>
        <span className="text-sm">Progress: {uncompletedPercentage}%</span>
      </motion.div>

      {/* Points with Progress Bar */}
      <motion.div
        variants={pointsVariants}
        className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md bg-blue-100 text-blue-700"
      >
        <span className="text-lg font-semibold">🏆 Points</span>
        <span className="text-2xl font-bold">{points}</span>
        <span className="text-sm">Progress: {pointsPercentage}%</span>
        <div className="w-full bg-gray-300 rounded-md h-2">
          <div
            className="h-2 bg-blue-500 rounded-md"
            style={{ width: `${pointsPercentage}%` }}
          ></div>
        </div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div
        className="col-span-1 md:col-span-3 text-center font-semibold text-cyan-50 mt-4"
      >
        {getMotivationMessage()}
      </motion.div>
    </motion.div>
  );
};

export default TaskSummary;





// import { motion } from "framer-motion";
// import { useTasks } from "../context/TaskProvider";

// const pointsVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 },
//   },
// };

// const TaskSummary = ({ pointCalculator }) => {
//   const { state: { tasks } } = useTasks();

//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(task => task.isFinished).length;
//   const uncompletedTasks = totalTasks - completedTasks;

//   const completedPercentage = totalTasks
//     ? ((completedTasks / totalTasks) * 100).toFixed(1)
//     : 0;
//   const uncompletedPercentage = totalTasks
//     ? ((uncompletedTasks / totalTasks) * 100).toFixed(1)
//     : 0;

//   const points = pointCalculator(tasks);
//   const pointsPercentage = ((points / 1000) * 100).toFixed(1);

//   return (
//     <motion.div
//       variants={pointsVariants}
//       initial="hidden"
//       animate="visible"
//       className="grid grid-cols-1 w-full md:grid-cols-3 gap-6 p-6"
//     >
//       {/* Completed Tasks */}
//       <motion.div
//         variants={pointsVariants}
//         className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md bg-green-100 text-green-700"
//       >
//         <span className="text-lg font-semibold">✅ Completed Tasks</span>
//         <span className="text-2xl font-bold">{completedTasks}</span>
//         <span className="text-sm">Progress: {completedPercentage}%</span>
//       </motion.div>

//       {/* Uncompleted Tasks */}
//       <motion.div
//         variants={pointsVariants}
//         className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md bg-orange-100 text-orange-700"
//       >
//         <span className="text-lg font-semibold">⏳ Uncompleted Tasks</span>
//         <span className="text-2xl font-bold">{uncompletedTasks}</span>
//         <span className="text-sm">Progress: {uncompletedPercentage}%</span>
//       </motion.div>

//       {/* Points */}
//       <motion.div
//         variants={pointsVariants}
//         className="flex flex-col justify-center items-center gap-2 border p-4 rounded-lg shadow-md bg-blue-100 text-blue-700"
//       >
//         <span className="text-lg font-semibold">🏆 Points</span>
//         <span className="text-2xl font-bold">{points}</span>
//         <span className="text-sm">Progress: {pointsPercentage}%</span>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TaskSummary;





// import { motion } from "framer-motion"; 
// import { useTasks } from "../context/TaskProvider";

// const pointsVaraints = {
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 2,
//       },
//     },
//   };
// const TaskSummary = ({ pointCalculator }) => {
//   const {state:{tasks}} = useTasks()
//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter((task) => task.isFinished).length;
//     const uncompletedTasks = totalTasks - completedTasks;
  
//     const completedPercentage = totalTasks
//       ? ((completedTasks / totalTasks) * 100).toFixed(1)
//       : 0;
  
//     const uncompletedPercentage = totalTasks
//       ? ((uncompletedTasks / totalTasks) * 100).toFixed(1)
//       : 0;
  
//     const points = pointCalculator(tasks);
//     const pointsPercentage = ((points / 1000) * 100).toFixed(1);
  
//     return (
//       <motion.div variants={pointsVaraints} initial="hidden" animate="visible" className="grid grid-cols-1 w-full md:grid-cols-3 gap-4 p-4">
//         {/* Completed Tasks */}
//         <motion.div className="flex flex-col justify-center items-center gap-2  border p-1 rounded-md shadow-md text-green-600">
//           <span>Completed Tasks: {completedTasks}</span>
//           <span>Progress: {completedPercentage}%</span>
//         </motion.div>
//         {/* Uncompleted Tasks */}
//         <motion.div className="flex flex-col justify-center items-center gap-2  border  p-2 rounded-md shadow-md text-orange-600">
//           <span>Uncompleted Tasks: {uncompletedTasks}</span>
//           <span>Progress: {uncompletedPercentage}%</span>
//         </motion.div>
  
//         {/* Points */}
//         <motion.div className="flex flex-col justify-center items-center gap-2  border px-2 p-1 rounded-md shadow-md text-blue-600">
//           <span>Points: {points} Points</span>
//           <span>Progress: {pointsPercentage}%</span>
//         </motion.div>
//       </motion.div>
//     );
//   };
  
//   export default TaskSummary;  