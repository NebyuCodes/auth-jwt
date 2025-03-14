import mongoose, { Document, Schema } from "mongoose";

export interface ISessionsDocument extends Document {
  user: string;
  deviceId: string;
  deviceInfo: string;
  expireDate: Date;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const sessionsSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    deviceId: {
      type: String,
      required: [true, "Device ID is required."],
    },
    deviceInfo: {
      type: String,
      required: [true, "Device info is required."],
    },
    expireDate: {
      type: Date,
      required: [true, "Expire date is required."],
    },
    isOwner: {
      type: Boolean,
      dafault: false,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
  }
);
