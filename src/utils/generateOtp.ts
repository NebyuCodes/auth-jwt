import { generate } from "otp-generator";

/**
 * @returns {string}
 */
export const generateOtp = (): string => {
  return generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    digits: true,
    specialChars: false,
  });
};
