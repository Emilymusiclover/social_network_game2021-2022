import { Router } from "express";
import { celebrate, Joi } from "celebrate"; //Validation

import { Container } from "typedi";

import IUserReactionController from "../../controllers/IControllers/IUserReactionController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use("/userreactions", route);

  const ctrl = Container.get(config.controllers.userReaction.name) as IUserReactionController;
  

  route.get("/:id", (req, res, next) => ctrl.getReaction( req,res, next));

  
    route.post(
      "",
     
      (req, res, next) => ctrl.createReaction(req, res, next)
    );
};
