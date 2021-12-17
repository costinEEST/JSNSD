import { createServer } from "node:http";

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const { PORT = 3008 } = process.env;
const server = express();

server.use((req, _, next) => {
  if (req.socket.remoteAddress === "127.0.0.1") {
    const err = new Error("Forbidden");
    err.status = 403;

    next(err);

    return;
  }

  next();
});

server.get("/", (req, res) => {
  res.send("The remote IP address is: " + req.socket.remoteAddress);
});

createServer(server).listen(PORT, function () {
  console.log("Listening on: ", this.address());
});
