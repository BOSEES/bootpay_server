import express from "express";
import axios from "axios";
const app = express();

app.get("/paycheck", async (req, res) => {
  const accessToken = {
    headers : {
      Authorization: req.body.obj.accessToken
    }
  }
  const receiptId = req.body.obj.receiptId;
  const receipt = await axios.get(`https://api.bootpay.co.kr/receipt/${receiptId}`,null, accessToken);
  
  return res.json(receipt);
})