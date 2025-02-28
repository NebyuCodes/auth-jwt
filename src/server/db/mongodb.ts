import mongoose, { Connection } from "mongoose";
import config from "../../config";

/**
 * Connect to MongoDB
 * @param {}
 * @returns {}
 */

export default (): Connection => {
  mongoose.connect(config.db.remote).then(() => {
    console.log(`MongoDB is successfully connected`);
  });

  return mongoose.connection;
};
