import { Router } from "express";
import { celebrate, Joi } from "celebrate"; //Validation

import { Container } from "typedi";

import IPostController from "../../controllers/IControllers/IPostController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/posts", route);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;
  // Post request /api/posts
  //Joi validation request text is required
  route.post(
    "/:id",
  
    (req, res, next) => ctrl.createPost(req, res, next)
  );

  // Get request /api/posts
  //Joi validation request text is required
  route.get("", (req, res, next) => ctrl.getAllPosts(req, res, next));

  // Get request /api/posts/id

  route.get("/:id", (req, res, next) => ctrl.getPost(req, res, next));

  // Delete request /api/posts/id

  route.delete("/:id", (req, res, next) => ctrl.removePost(req, res, next));
  //Update post
  route.put('/:id',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        text: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updatePost(req, res, next) );

    route.post(
      "/comments/:id",
      celebrate({
        body: Joi.object({
          text: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.createCommentPost(req, res, next)
    );

    route.get(
      "/comments/:id",
      celebrate({
        body: Joi.object({
          text: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.getCommentsPost(req, res, next)
    );
};
