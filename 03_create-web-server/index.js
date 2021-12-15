import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const port = process.env.PORT || 3002;

server.get("/", (_, res) => {
  res.send("Greetings from Node.js");
});

http.createServer(server).listen(port, function () {
  console.log("Listening on ", this.address());
});
