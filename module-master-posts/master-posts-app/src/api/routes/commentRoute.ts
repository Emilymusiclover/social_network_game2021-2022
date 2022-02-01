import { Router } from "express";
import { celebrate, Joi } from "celebrate"; // Validation
import { Container } from "typedi";

import ICommentController from "../../controllers/IControllers/ICommentController";
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/comments", route);
  const ctrl = Container.get(
    config.controllers.comment.name
  ) as ICommentController;

  // Post request /api/posts
  // Joi validation request text is required
  route.post("", (req, res, next) => ctrl.createComment(req, res, next));

  // Get request /api/posts
  // Joi validation request text is required
  // route.get("", (req, res, next) => ctrl.getAllPosts(req, res, next));

  // Get request /api/posts/id
  route.get("/:id", (req, res, next) => ctrl.getComment(req, res, next));

  // Delete request /api/posts/id
  route.delete("/:id", (req, res, next) => ctrl.removeComment(req, res, next));

  // Update post
  route.put(
    "/:id",
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        text: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateComment(req, res, next)
  );
};
