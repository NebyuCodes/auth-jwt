import { decode, JwtPayload, verify } from "jsonwebtoken";
import config from "../../config";

interface ICustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

/**
 * Verify token
 * @param {string} token
 * @returns {JwtPayload} Jwt payload
 */
export default (token: string): ICustomJwtPayload => {
  return decode(token) as ICustomJwtPayload;
};

// Payload
// iat - Issued at
// exp - expire date
//  {
//   id:"sdfsgdfgdfh",
//   role:"user",
//   deviceId:"SDgsnlgnsdgn;gsdfg"
//   iat:124235346356,
//   exp:124235346568,
//  }
