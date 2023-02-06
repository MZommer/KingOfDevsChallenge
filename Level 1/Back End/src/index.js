const express = require("express");
const app = express();
const users = require("../users.json");
module.exports = app;

//Write your code here
app.get("/users", (req, res) => {
  const userId = req.query.id;
  if (!userId) return res.send(users);
  const user = users.find((user) => user.id == userId);
  res.send(user);
});
