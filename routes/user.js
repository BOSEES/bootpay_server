import express from "express";
import User from "../models/user";
const app = express();

app.post("/create-user", (req, res) => {
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) {
      return res.json({
        success: false,
        message: "유저 생성 실패",
        err
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "유저 생성 성공"
      })
    }
  })
})
