import http from "http";
import { join } from "path";
import { finished } from "stream";

import express from "express";
import dotenv from "dotenv";

import { __dirname } from "../utils.js";
import dataStream from "./data.js";

dotenv.config();

const publicDir = join(__dirname, "04_serve-web-content/public");
const server = express().use(express.static(publicDir));
const port = process.env.PORT || 3002;

server.set("views", join(__dirname, "views"));
server.set("view engine", "hbs");

server.get("/", (_, res) => {
  res.sendFile(join(publicDir, "index.html"));
});

server.get("/me", (_, res) => {
  res.send("UI dev");
});

server.get("/data", (_, res, next) => {
  const data = dataStream();

  data.pipe(res, { end: false });

  finished(data, (err) => {
    if (err) {
      next(err);

      return;
    }

    res.end();
  });
});

http.createServer(server).listen(port, function () {
  console.log("Listening on ", this.address());
});
