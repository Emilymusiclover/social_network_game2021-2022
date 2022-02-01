import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";

import config from "../../../config";
import IFeedController from "../../controllers/IControllers/IFeedController";
import IFeedDto from "../../dto/IFeedDto";

const route = Router();

export default (app: Router) => {
  app.use("/feeds", route);
  const ctrl = Container.get(config.controllers.feed.name) as IFeedController;

  // Post request /api/feeds
  route.post(
    "",
    (req, res, next) => ctrl.validateUser(req, res, next),
    (req, res, next) => ctrl.createFeed(req, res, next)
  );

  // Get Request /api/feeds
  route.get("", (req, res, next) => ctrl.getAllFeeds(req, res, next));

  // Get request /api/feeds/id
  route.get("/:id", (req, res, next) => ctrl.getFeed(req, res, next));

  // Get request /api/feeds/byUserId/id
  route.get(
    "/userId/:id",
    (req, res, next) => ctrl.validateUser(req, res, next),
    (req, res, next) => ctrl.getFeedByUser(req, res, next)
  );

  // Delete request /api/feeds/id
  route.delete("/:id", (req, res, next) => ctrl.removeFeed(req, res, next));

  // Update request /api/feeds/id
  route.put(
    "/:id",
    (req, res, next) => ctrl.validateUser(req, res, next),
    (req, res, next) => ctrl.updateFeed(req, res, next)
  );

  // celebrate({
  //   body: Joi.object({
  //     id: Joi.string().required(),
  //     text: Joi.string().required(),
  //   }),
  // }),
  
};
