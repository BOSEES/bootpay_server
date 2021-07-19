import express from "express";
import bootpayToken from "../modules/bootpayToken";
import Item from "../models/item";
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
          }
        }
      });
    }
  })
})

app.post("/cancel", (req, res) => {
  bootpayToken.getAccessToken()
  .then((token) => {
    if (token.status === 200) {
      RestClient.cancel({
          receiptId: req.body.receipt_id,
          price: req.body.price,
          name: req.body.name,
          reason: req.body.reason
      }).then(function (response) {
    // 결제 취소가 완료되었다면
    if (response.status === 200) {
      // TODO: 결제 취소에 관련된 로직을 수행하시면 됩니다.
      console.log("결제 취소 완료");
    }
  });
}
  })
})

export default app;