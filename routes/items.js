import express from "express";
import authUtil from "../middleWares/auth.js";
import Item from "../models/item.js";
const app = express();

//상품 등록하기
app.post("/item",authUtil.checkToken, (req, res) => {
  const item = new Item(req.body);
  
  item.save((error, itemInfo) => {
    if (error) {
      return res.json({
        success: false,
        message: "상품 등록 실패",
        error
      })
    } else {
      return res.json({
        success:true,
        message: "상품 등록 성공"
      })
    }
  })
})

//상품 전체 조회하기
app.get("/items", (req, res) => {
  Item.find({}, (error, items) => {
    if (error) {
      return res.json({
        success: false,
        message: "상품 조회 실패",
        error
      })
    } else {
      return res.json({
        items
      });
    }
  })
})

export default app;