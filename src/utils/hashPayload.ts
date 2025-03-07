import { hashSync } from "bcryptjs";

/**
 * @param {string} payload
 * @returns {string}
 */

export const hashPayload = (payload: string): string => {
  return hashSync(payload, 12);
};
