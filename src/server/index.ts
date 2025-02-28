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

  // console.log(generateToken("1", "user"));
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MDc2NTExMSwiZXhwIjoxNzQwNzY1MTcxfQ.X92R9YhMWii0tr_Mivg6PM7tB9o3jewI-29z9ArRIoQ";
  console.log(verifyToken(token));

  server.listen(port, () => {
    console.log(`Listening on ${port}...`);
  });

  // const mongo = db.mongo();

  // Majestic close
  process.on("SIGINT", () => {
    // mongo.close();
    server.close(() => {
      console.log("Server is closing");
    });
  });
};
