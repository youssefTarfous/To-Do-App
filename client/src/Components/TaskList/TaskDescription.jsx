import { motion } from 'framer-motion'
const TaskDescription = ({task}) => {
  return (
    <div>
        {task.isFinished ? (
              <motion.del
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-gray-300">{task.description}</p>
              </motion.del>
            ) : (
              <p className="text-gray-300">{task.description}</p>
            )}
    </div>
  )
}

export default TaskDescription