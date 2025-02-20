import { Router } from "express";
import { checkSchema } from "express-validator";
import { taskValidator } from "../Schemas/Validation/ValidatorSchema.mjs";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateIsFinished,
  updatingTask,
} from "../Controllers/TaskController.mjs";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);

router.post("/", checkSchema(taskValidator), createTask);

router.put("/:id", checkSchema(taskValidator), updatingTask);
router.patch("/:id", updateIsFinished);
router.delete("/:id", deleteTask);

export default router;
