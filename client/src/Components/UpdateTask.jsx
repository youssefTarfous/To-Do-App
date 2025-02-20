import { ModalVariants } from "../animation/Motion";
import { useTasks } from "../context/TaskProvider";
import UpdateModal from "./UpdateModal/UpdateModal";
import { motion, AnimatePresence } from "framer-motion";



const UpdateTask = () => {
  const {
    state: { showModalUpdate },
    dispatch,
  } = useTasks();

  const handleClose = () => {
    dispatch({ type: "CANCEL_UPDATE" });
  };

  return (
    <>
      <AnimatePresence>
        {showModalUpdate && (
          <motion.div
            variants={ModalVariants}
            initial="hidden"
            animate="visible"
            // transition={{
            //   duration: 0.6,
            //   ease: "linear",
            // }}
            exit="exit"
            className="h-7/8 w-3/5 p-6 bg-cyan-950 rounded-3xl container shadow-lg shadow-cyan-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-labelledby="update-task-modal"
          >
            <button
              onClick={handleClose}
              className="absolute top-0 left-0  text-white bg-red-600 hover:bg-red-700 p-2 py-1  rounded-lg"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <UpdateModal />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UpdateTask;
