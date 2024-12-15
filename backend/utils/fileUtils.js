const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/users.json");

const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ users: [] }, null, 2));
  }
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
