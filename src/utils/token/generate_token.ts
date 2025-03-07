import { sign } from "jsonwebtoken";
import config from "../../config";

/**
 * Generate or sign token
 * @param {string} id
 * @returns {string} token
 */
export default (id: string, role: string) => {
  return sign({ id, role }, config.jwt.secret, {
    expiresIn: "90d",
  });
};
