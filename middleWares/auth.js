import jwt from "../modules/jwt.js";
import MSG from "../modules/responseMessage.js";
import CODE from "../modules/statusCode.js";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: async (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
      return res.json(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN)
    }

    const user = await jwt.verify(token);

    if (user === TOKEN_EXPIRED) {
      return res.json(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN);
    }
    if (user === TOKEN_INVALID) {
      return res.json(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN);
    }

    if (user.id === undefined) {
      return res.json(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN);
    }
    req.id = user.id;
    next();
  }
}

export default authUtil;