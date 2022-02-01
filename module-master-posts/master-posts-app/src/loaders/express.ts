import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";
import config from "../../config";
import postRoute from "../api/routes/postRoute";
import { MessageChannel } from "worker_threads";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/", (req, res) => {
    return res.send("<h1>Master Data App</h1>");
  });
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // logger middleware
  app.use((req, res, next) => {
    console.log(
      `logger (${new Date().toLocaleString()}) > (${
        req.headers["x-forwarded-for"] || req.socket.remoteAddress
      }) ${req.method} ${req.originalUrl}`
    );
    next();
  });

  // load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    console.log(
      `error handler (${new Date().toLocaleString()}) > ${err.name} : ${
        err.message
      }`
    );
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ error: err.message }).end();
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  });
};
