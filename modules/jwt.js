import randToken from "rand-token";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwtSecretKey";
import { options } from "../config/jwtSecretKey";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
  sign: async (user) => {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const result = {
      token: jwt.sign(payload,secretKey,options),
      refreshToken: randToken.uid(256)
    }
    return result;
  },
  verify: async (token) => {
    let decoded;

    try {
      decoded = jwt.verify(token, secretKey);
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (error.message === "invalid token") {
        console.log("invalid token");
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  }
}