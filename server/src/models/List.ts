import { Schema, model, Document } from "mongoose";
import { ITodo } from "./Todo";

export interface IList extends Document {
  author: string;
  title: string;
  description: string;
  todos: ITodo[] | string[];
}

const ListSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

export default model<IList>("List", ListSchema);
