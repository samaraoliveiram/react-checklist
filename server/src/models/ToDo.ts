import { Schema, model, Document } from "mongoose";

export interface IToDo extends Document {
  title: string;
  description: string;
  date: string;
}

const ToDoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true , default: Date.now},
  done: { type: Boolean , default: false},
  
});

export default model<IToDo>("ToDo", ToDoSchema);
