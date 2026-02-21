module.exports = {
  name: "app.open",

  match(input) {
    return input.includes("打开");
  },

  execute() {
    return {
      reply: "模拟打开浏览器成功",
      success: true
    };
  }
};
