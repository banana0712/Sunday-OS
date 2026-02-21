const express = require("express");
const bodyParser = require("body-parser");
const { fallback } = require("./services/aiFallback");

const app = express();
app.use(bodyParser.json());

const ARK_API_KEY = process.env.ARK_API_KEY;

app.post("/agent", async (req, res) => {
  const userInput = req.body.input;
  const result = await fallback(userInput, ARK_API_KEY);
  res.json({
    intent: "ai.fallback",
    response: result.reply,
    success: result.success
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunday OS 服务已启动，监听端口 ${PORT}`);
});
