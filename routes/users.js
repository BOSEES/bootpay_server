import express from "express";
import User from "../models/user";
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
  User.findOne({email: req.body.email}, (error, user) => {
    if(!user) {
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    } else if (user.password !== req.body.password) {
      return res.json({
        loginSuccess:false,
        message: "비밀번호가 맞지 않습니다."
      })
    }
    return res.json({
      loginSuccess:true,
      user
    })
  })
})

export default app;