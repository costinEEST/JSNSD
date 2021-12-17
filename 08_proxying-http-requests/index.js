import { createServer } from "node:http";

import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const server = express();
const port = process.env.PORT || 3008;

/**
 * if the Authorization header is missing,
 * set the status as 'Forbidden'
 * */
server.use("", (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

/**
 * curl localhost:3009/json_placeholder/posts/10
 * */
server.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    pathRewrite: {
      [`^/json_placeholder`]: "",
    },
  })
);

createServer(server).listen(port, function () {
  console.log("Listening on: ", this.address());
});
