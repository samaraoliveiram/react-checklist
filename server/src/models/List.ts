import { Schema, model, Document } from "mongoose";
import { IToDo } from "./ToDo";

export interface IList extends Document {
  author: string;
  title: string;
  description: string;
  todos: IToDo[] | string[];
}

const ListSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  todos: [{ type: Schema.Types.ObjectId, ref: "ToDo" }]
});

export default model<IList>("List", ListSchema);
