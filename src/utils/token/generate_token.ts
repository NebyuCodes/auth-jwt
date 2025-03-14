import { sign } from "jsonwebtoken";
import config from "../../config";

/**
 * Generate or sign token
 * @param {string} id
 * @returns {string} token
 */
export default (id: string, role: string, deviceId?: string) => {
  return sign({ id, role, deviceId }, config.jwt.secret, {
    expiresIn: "90d",
  });
};
