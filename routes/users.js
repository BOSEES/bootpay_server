import express from "express";
import User from "../models/user";
import jwt from "../modules/jwt";
import authUtil from "../middleWares/auth";
const app = express();

app.post("/join", (req, res) => {
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) {
      return res.json({
        success: false,
        message: "유저 생성 실패",
        error
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "유저 생성 성공"
      })
    }
  })
})

app.post("/login", (req, res) => {
  User.findOne({email: req.body.email}, async (error, user) => {
    if(!user) {
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    
    user.comparePassword(req.body.password, async (error, isMatch) => {
      if (!isMatch) {
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      }
      try{
        const jwtToken = await jwt.sign(user);

        return res.json({
          loginSuccess:true,
          userInfo : {
            username: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone
          },
          token: jwtToken.token,
        })
      } catch(error) {
        return console.log(error);
      }
    })
  })
})

app.post("/check", authUtil.checkToken ,(req, res) => {
  return res.json({
    successCheck: true,
    message: "유효한 정보입니다."
  })
})

export default app;