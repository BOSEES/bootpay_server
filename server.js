// const express = require("express");
import express from "express";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import itemRouter from "./routes/items";
import verifyRouter from "./routes/verifyPayment";

require("dotenv").config();

const cors = require("cors");
const app = express();
const {PORT,MONGO_URL} = process.env;

//미들웨어
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

//몽고디비 연결
mongoose.connect(MONGO_URL,{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(() => {
  console.log("몽고디비 아틀라스 연결 성공");
}).catch((e) => {
  console.error(e);
})

//익스프레스 세션
app.use(expressSession({
  secret: "@XDF@#$#R!@!@!@##!@", 
  resave: false, 
  saveUninitialized: true,
  cookie:{maxAge:(3.6e+6)*24}, // 24시간 뒤 만료(자동 삭제)
}))

//API 라우터
app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/verify",verifyRouter);

app.listen (PORT, () => {
  console.log(`서버실행 http://localhost:${PORT}`);
})
