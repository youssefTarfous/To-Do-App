import { BiTaskX } from 'react-icons/bi'

const TaskUnFinished = ({task}) => {
  return (
    <div>
        <div className="text-lg font-semibold text-orange-600 flex  lg:flex-row lg:justify-around flex-col items-center gap-2 w-full ease-in-out duration-300">
                  <BiTaskX size={80} />
                  <div className="flex justify-between items-center w-full">
                    <h3 className="">{task.title}</h3>
                    {console.log(task.priority)}
                    <span
                      className={`text-xs font-medium text-cyan-50 px-2 py-1 rounded-full ${
                        task.priority.toLowerCase() === "low".toLowerCase()
                          ? "bg-green-600"
                          : task.priority.toLowerCase() ===
                            "medium".toLowerCase()
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </div>
                </div>
    </div>
  )
}

export default TaskUnFinished