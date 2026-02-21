const axios = require("axios");

// 火山引擎大模型调用
async function fallback(userInput, arkApiKey) {
  try {
    const body = {
      model: "doubao-1-5-pro-32k-250115",
      messages: [
        { role: "system", content: "你是幽默风趣的助手" },
        { role: "user", content: userInput }
      ],
      max_output_tokens: 300
    };

    // 发起请求到火山引擎
    const response = await axios.post(
      "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      body,
      {
        headers: {
          "Authorization": `Bearer ${arkApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 打印原始返回，便于调试
    console.log("🔥 火山引擎返回原始 JSON:", JSON.stringify(response.data, null, 2));

    // 获取返回的 AI 回复
    const aiReply = response.data?.choices?.[0]?.message?.content || "(火山引擎没有返回内容)";
    return { reply: aiReply, success: true };
  } catch (err) {
    console.error("火山引擎 fallback 出错:", err.message);
    return { reply: "抱歉，AI 服务暂时不可用。", success: false };
  }
}

module.exports = { fallback };
