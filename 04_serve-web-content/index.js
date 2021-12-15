import http from "http";
import { join } from 'path'

import express from "express";
import dotenv from "dotenv";

import { __dirname } from '../utils.js'

dotenv.config();


const server = express();
const port = process.env.PORT || 3002;

server.set('views', join(__dirname, 'views'))
server.set('view engine', 'hbs')

server.get('/me', (_, res) => {
  res.send('UI dev')
})

http.createServer(server).listen(port, function () {
  console.log("Listening on ", this.address());
});
