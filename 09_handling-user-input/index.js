import { createServer } from "node:http";

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const { PORT = 3008 } = process.env;
const server = express();
const router = express.Router();

const makeUpperCase = (input = "") => {
  if (Array.isArray(input)) {
    return input.map((c) => String(c).toUpperCase());
  }

  return input.toUpperCase();
};

/**
 * curl localhost:3009/?nickname=mara,ada
 * */
server.get("/", (req, res) => {
  setTimeout(() => {
    res.send(makeUpperCase(req.query.nickname));
  }, 300);
});

server.use(router);

createServer(server).listen(PORT, function () {
  console.log("Listening on: ", this.address());
});
