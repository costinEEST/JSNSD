import http from "http";

import express from "express";
import dotenv from "dotenv";

import fruitsModel from './dbModel.js'

dotenv.config();

const server = express()
const port = process.env.PORT || 3002;

server.get("/fruit/:id", (req, res, next) => {
  fruitsModel().read(req.params.id, (err, data) => {
    if (err) {
      if (err.message === 'not found') {
        next()
        return
      }

      next(err)
      return
    }

    res.json(data)
  })

});


server.use((_, res) => {
  res.status(404).json({ message: 'not found' })
})

server.use((err, _, res) => {
  res.status(err.status ?? 500).json({ message: 'internal server error' })
})

http.createServer(server).listen(port, function () {
  console.log("Listening on ", this.address());
});
