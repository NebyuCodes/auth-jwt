import { JwtPayload, verify } from "jsonwebtoken";
import config from "../../config";

interface ICustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

/**
 * Verify token
 * @param {string} token
 * @returns {JwtPayload} Jwt payload
 */
export default (token: string): ICustomJwtPayload => {
  return verify(token, "12345") as ICustomJwtPayload;
};

// Payload
// iat - Issued at
// exp - expire date
//  {
//   id:"sdfsgdfgdfh",
//   role:"user",
//   iat:124235346356,
//   exp:124235346568,
//  }
