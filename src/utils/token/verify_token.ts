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
export default (token: string, isRefresh: boolean): ICustomJwtPayload => {
  let secret = config.jwt.access.secret;
  if (isRefresh) {
    secret = config.jwt.refresh.secret;
  }
  return verify(token, secret) as ICustomJwtPayload;
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
