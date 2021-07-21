import express from "express";
import Item from "../models/item";
const app = express();

app.post("/item", (req, res) => {
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