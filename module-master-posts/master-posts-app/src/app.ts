// Note Later configure Port
// app.listen(5000,() => (console.log("Server is running!")));

import "reflect-metadata"; // We need this in order to use @Decorators ???

import config from "../config"; //Env variables

import express from "express";

import Logger from "./loaders/logger";

async function startServer() {
  const app = express();
  await require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log("Server listening on port: " + config.port);
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
      return;
    });
}

startServer();
