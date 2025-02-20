import mongoose, { mongo, Schema } from "mongoose";

export const task = new Schema(
  {
    title: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    due: { type: mongoose.Schema.Types.Date, required: true },
    priority: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    isFinished: { type: mongoose.Schema.Types.Boolean, required: true },
  },
  { timestamps: true }
);
const taskModel = mongoose.model("task", task);
export default taskModel;
