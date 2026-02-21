const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function fallback(userInput, context = []) {
  const contextText = context.map(c => `你: ${c.input}\nSunday: ${c.response}`).join("\n");

  const prompt = `${contextText}\n你: ${userInput}\nSunday:`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一个有幽默感的智能助理" },
        { role: "user", content: prompt }
      ]
    });

    const aiResponse = completion.choices[0].message.content.trim();

    return {
      reply: aiResponse,
      success: true
    };
  } catch (err) {
    console.error("AI fallback 出错:", err.message);
    return {
      reply: "抱歉，我暂时无法回答这个问题。",
      success: false
    };
  }
}

module.exports = { fallback };
