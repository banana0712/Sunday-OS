module.exports = {
  name: "time.query",

  match(input) {
    return input.includes("时间") || input.includes("几点");
  },

  execute({ context }) {
    const now = new Date();

    // 可参考上下文做高级逻辑，比如提醒用户上一次查询时间
    let reply = `现在时间是 ${now.toLocaleTimeString()}`;

    if (context.length > 0) {
      const lastQuery = context.slice(-1)[0];
      reply += `（上次你问的是: "${lastQuery.input}"）`;
    }

    return {
      reply,
      success: true
    };
  }
};
