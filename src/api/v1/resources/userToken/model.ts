import { model } from "mongoose";
import { IUserTokenDoc, userTokenSchema } from "./schema";

export const UserTokenModel = model<IUserTokenDoc>(
  "UserToken",
  userTokenSchema
);
