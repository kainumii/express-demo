// https://www.youtube.com/watch?v=pKd0Rpw7O48
// C:\Omat_Demot\node.js\restapi-nodejs-express.md

const express = require("express");
const axios = require("axios");
const app = express();
const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/todos/1";
// const router = express.Router();
const fs = require("fs");
const todosRouter = require("./routes/todosRouter")();

app.use(express.json());
app.use("/api", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening port ${port} ....`);
});
