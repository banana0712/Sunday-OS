const fs = require("fs");
const path = require("path");

const intentModules = [];

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file === "index.js") continue;
  if (!file.endsWith(".js")) continue;

  const intent = require(path.join(__dirname, file));

  // 确认插件有 match 函数
  if (typeof intent.match === "function") {
    intentModules.push(intent);
  }
}

function findIntent(input) {
  for (const intent of intentModules) {
    if (intent.match(input)) {
      return intent;
    }
  }
  return null;
}

module.exports = { findIntent };
