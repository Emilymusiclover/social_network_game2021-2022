import { Router } from "express";
import { celebrate, Joi } from "celebrate"; //Validation

import { Container } from "typedi";

import IReactionsController from "../../controllers/IControllers/IReactionsController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/reactions", route);

  const ctrl = Container.get(config.controllers.reactions.name) as IReactionsController;
  

  route.get("/:id", (req, res, next) => ctrl.getReactions( req,res, next));

  
    route.post(
      "/:id",
      
      (req, res, next) => ctrl.createReactionsPost(req, res, next)
    );
};
