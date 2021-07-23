import express from "express";
import bootpayToken from "../modules/bootpayToken";
import Item from "../models/item";
import User from "../models/user";
import authUtil from "../middleWares/auth";
const app = express();

app.post("/paycheck", (req, res) => {
  bootpayToken.getAccessToken()
  .then((response) => {
    if (response.status === 200 && response.data.token !== undefined) {
      bootpayToken.verify(req.body.receipt_id).then(function (_response) {
      // 검증 결과를 제대로 가져왔을 때
        if (_response.status === 200) {
          if (_response.data.price === req.body.price && _response.data.status === 1) {
            // TODO: 이곳이 상품 지급 혹은 결제 완료 처리를 하는 로직으로 사용하면 됩니다.
            console.log("결제검증 true");
            Item.updateOne({unique: req.body.params.unique},
              {$inc: {qty: -req.body.params.qty}}, (error,item) => {
                if (error) {
                  console.log(error);
                }
                User.updateOne({email: req.body.params.email},
                  {$push: {buy: {
                    receiptId: _response.data.receipt_id,
                    itemImage: req.body.params.itemImage,
                    name: req.body.params.name,
                    price: _response.data.price,
                    qty: req.body.params.qty,
                  }
                }}, (error, update) => {
                  if (error) {
                    console.log(error,"내가 산 목록에 담지 못했습니다.")
                  }
                })
              });
            return res.json({
              message: "결제 성공"
            });
          }
        }
      });
    }
  })
})

app.post("/cancel",authUtil.checkToken, (req, res) => {
  bootpayToken.getAccessToken()
  .then((token) => {
    if (token.status === 200) {
      bootpayToken.cancel({
          receiptId: req.body.receipt_id,
          price: req.body.price,
          name: req.body.name,
          reason: req.body.reason
      }).then(function (response) {
        // 결제 취소가 완료되었다면
        if (response.status === 200) {
          // TODO: 결제 취소에 관련된 로직을 수행하시면 됩니다.
          User.updateOne({email: req.body.email},
            {$pull: {buy: {receiptId: req.body.receipt_id}}},
          (error, user) => {
            if(error) {
              console.log(error);
              return res.json({
                success:false,
                message: "결제 취소 실패"
              })
            } else {
              return res.json({
                success:true,
                message: "결제 취소 완료"
              })
            }
          })
        }
      });
    }
  })
})

export default app;