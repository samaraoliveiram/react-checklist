import { Schema, model, Document } from "mongoose";
import { IList } from "./List";

export interface ITodo extends Document {
  author: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
  list: IList | string;
}

const TodoSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true, default: Date.now },
  done: { type: Boolean, default: false },
  list: { type: Schema.Types.ObjectId, ref: "List", required: true }
});

export default model<ITodo>("Todo", TodoSchema);
