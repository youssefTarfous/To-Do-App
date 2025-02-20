import { isValidObjectId } from "mongoose";
import taskModel from "../Schemas/Mongoose/TaskModel.mjs";
import { matchedData, validationResult } from "express-validator";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({})
      .sort({ isFinished: 1, createdAt: 1 });

    // If no tasks are found, return an empty array
    if (!tasks || tasks.length === 0) {
      return res.status(200).json([]); // Return an empty array instead of a string
    }

    // If tasks are found, return them as a JSON response
    
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res
      .status(500)
      .json({ message: "Server error, failed to fetch tasks" });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send(`No task with id: ${id}`);
  }
  try {
    const task = await taskModel.findById(id);
    if (!task) return res.status(200).send(`No task with id: ${id}`);
    return res.status(200).send(task);
  } catch (error) {
    console.error("Error saving task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const createTask = async (req, res) => {
  console.log("Request Body:", req.body); // Debugging log
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const data = matchedData(req);
    const task = new taskModel(data);
    const savedTask = await task.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error saving task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const updatingTask = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send(`No task with id: ${id}`);
  }
  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    let data = matchedData(req);
    const updateTask = await taskModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).send(updateTask);
  } catch (error) {
    console.error("Error saving task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const updateIsFinished = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).send(`No task with id: ${id}`);
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send(updatedTask);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error: ${error.message}` });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send(`No task with id: ${id}`);
  }
  const deleteTask = await taskModel.findByIdAndDelete(id);
  return res.status(200).send(deleteTask);
};
