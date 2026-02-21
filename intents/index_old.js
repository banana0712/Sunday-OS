const timeQuery = require("./time.query");
const appOpen = require("./app.open");

const intentModules = [timeQuery, appOpen];

function findIntent(input) {
  for (const intent of intentModules) {
    if (intent.match(input)) {
      return intent;
    }
  }
  return null;
}

module.exports = { findIntent };
