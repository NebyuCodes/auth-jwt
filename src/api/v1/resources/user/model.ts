import { userSchema, IUserDocument } from "./schema";
import { model } from "mongoose";
export const UserModel = model<IUserDocument>("User", userSchema);
