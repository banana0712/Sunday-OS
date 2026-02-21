// 简单内存上下文管理
// key: userId 或 sessionId
// value: 对话数组 [{input, response}]
const sessions = {};

function addContext(userId, input, response) {
  if (!sessions[userId]) {
    sessions[userId] = [];
  }
  sessions[userId].push({ input, response });

  // 只保留最近 10 条
  if (sessions[userId].length > 10) {
    sessions[userId].shift();
  }
}

function getContext(userId) {
  return sessions[userId] || [];
}

module.exports = { addContext, getContext };
