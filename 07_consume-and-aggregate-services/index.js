import http from "node:http";

import express from "express";
import dotenv from "dotenv";
import { request } from "undici";

dotenv.config();

const server = express();
const port = process.env.PORT || 3002;

server.get("/:id", async (req, res, next) => {
  try {
    /**
     * https://rickandmortyapi.com/documentation/#rest
     * */
    const { body: characterBody } = await request(
      `https://rickandmortyapi.com/api/character/${req.params.id}`
    );
    const characterData = await characterBody.json();

    const { body: locationBody } = await request(characterData?.location?.url);
    const locationData = await locationBody.json();

    res.json({
      characterName: characterData?.name,
      characterLocation: characterData?.location?.name,
      locationType: locationData?.type,
      residentsWithCurrentLocation: locationData?.residents?.length,
    });
  } catch (err) {
    if (err.response?.statusCode === "404") {
      next();

      return;
    }

    if (err.response?.statusCode === "400") {
      const badReq = new Error("bad request");
      badReq.status = 400;
      next(badReq);

      return;
    }

    next(err);
  }
});

server.use((_, res) => {
  res.status(404).json({ message: "not found" });
});

server.use((err, _req, res, _next) => {
  res.status(err.status ?? 500).json({
    status: err.status ?? 500,
    code: err?.code,
    message: err.message ?? "internal server error",
  });
});

http.createServer(server).listen(port, function () {
  console.log("Listening on ", this.address());
});
