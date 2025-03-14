import { v4 as uuidv4 } from "uuid";

/**
 * @param {string} userId
 * @returns {string}
 */

export const deviceIdGenerator = (userId: string): string => {
  return `${userId}-${uuidv4()}`;
};
