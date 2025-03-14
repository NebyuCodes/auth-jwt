import { UAParser } from "ua-parser-js";

/**
 * @param {string} userAgent
 * @returns {string}
 */

export const deviceInfo = (userAgent: string): string => {
  if (userAgent !== "Unknown") {
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();

    return `User Agent - ${userAgent} | Browser - ${result.browser.name} | ${result.browser.version} \n OS - ${result.os.name} | ${result.os.version} \n Device - ${result.device.model} | ${result.device.vendor} | ${result.device.type}`;
  } else {
    return "Unknown";
  }
};
