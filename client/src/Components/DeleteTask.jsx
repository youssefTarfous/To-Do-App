import { RiDeleteBin6Line } from "react-icons/ri";
import { useHandlers, useTasks } from "../context/TaskProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ModalVariants } from "../animation/Motion";
const DeleteTask = () => {
  const {
    state: { showModalDelete, deleteTaskId },
    dispatch,
  } = useTasks();
  const { confirmDelete } = useHandlers();
  return (
    <div>
      <AnimatePresence>
        {showModalDelete && (
          <motion.div
            variants={ModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center flex gap-8 text-center">
                <h2 className="card-title">Delete Task!</h2>
                <RiDeleteBin6Line size={80} color="red" />
                <h4 className="text-2xl">
                  Are you sure you want to delete this task?
                </h4>
                <div className="card-actions flex justify-around w-full">
                  <button
                    className="btn bg-red-600 hover:bg-red-700 text-cyan-50"
                    onClick={() => confirmDelete(deleteTaskId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-ghost border-2 border-gray-400"
                    onClick={() => dispatch({ type: "CANCEL_DELETE" })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteTask;
