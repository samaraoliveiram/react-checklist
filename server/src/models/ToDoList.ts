import { Schema, model, Document } from "mongoose";

export interface IToDoList extends Document {
  title: string;
  description: string;
}

const ToDoListSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String }
});

export default model<IToDoList>("ToDoList", ToDoListSchema);
