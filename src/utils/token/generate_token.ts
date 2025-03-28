import { sign } from "jsonwebtoken";
import config from "../../config";

/**
 * Generate or sign token
 * @param {string} id
 * @returns {string} token
 */
export default (
  id: string,
  role: string,
  isRefresh: boolean,
  deviceId?: string
) => {
  let secret = config.jwt.access.secret;
  let expiresIn: number = 1 * 60;
  if (isRefresh) {
    secret = config.jwt.refresh.secret;
    expiresIn = 2 * 60;
  }
  return sign({ id, role, deviceId }, secret, {
    expiresIn,
  });
};
