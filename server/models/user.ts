import { Schema, model, Document } from "mongoose";

interface IUserModel extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default model<IUserModel>("User", UserSchema);
