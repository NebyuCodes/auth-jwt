import mongoose, { Schema, Document } from "mongoose";

export interface IUserTokenDoc extends Document {
  user: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userTokenSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    refreshToken: {
      type: String,
      required: [true, "Refresh Token is required"],
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
