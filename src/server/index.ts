import { createServer } from "http";
import app from "./app";
import db from "./db";
import { generateToken, verifyToken } from "../utils/token";
/**
 * Server
 * @param {}
 * @returns {}
 */
export default () => {
  const port = (process.env.PORT as unknown as number) || 3000;

  const server = createServer(app);

  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });

  const mongo = db.mongo();

  // console.log(app._router.stack[5].handle.stack);

  // Majestic close
  process.on("SIGINT", () => {
    // mongo.close();
    server.close(() => {
      console.log("Server is closing");
    });
  });
};
