import { model } from "mongoose";
import { ISessionsDocument, sessionsSchema } from "./schema";

export const SessionsModel = model<ISessionsDocument>("Session", sessionsSchema);
