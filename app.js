const path = require("path");
const express = require("express");
//sdk＝必要なツールのセット
const line = require("@line/bot-sdk");
​
const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);
​
//inputはevent.message.text
//event.message.textはユーザー入力した言葉

function createReplyMessage(input) {
  // 1. 固定メッセージを返す
  return {
    type: "text",
    text: "まだ何もできません"
  };
}
​
const server = express();
​
server.use("/images", express.static(path.join(__dirname, "images")));  
​
server.post("/webhook", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);
​// コンストは定数変数
  for (const event of req.body.events) {
    if (event.type === "message" && event.message.type === "text") {
      const message = createReplyMessage(event.message.text);
      //ボットからメッセージを送る処理
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});
​
server.listen(process.env.PORT || 8080);