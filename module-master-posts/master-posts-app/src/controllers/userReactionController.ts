import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi"; //TypeScript Dependecy injection
import config from "../../config";

import IUserReactionController from "./IControllers/IUserReactionController";
import IUserReactionService from "../services/IServices/IUserReactionService";

import IUserReactionDTO from "../dto/IUserReactionDto";
import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";

@Service()
export default class UserReactionController
  implements
    IUserReactionController /* TODO: extends ../core/infra/BaseController */
{
  constructor(
    @Inject(config.services.userReaction.name)
    private reactionServiceInstance: IUserReactionService //Service injection
  ) {}

  public async getReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const reactionOrError = (await this.reactionServiceInstance.getReaction(
        req.params.id as string
      )) as Result<IUserReactionDTO>;
      //Failure
      if (reactionOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const reactionDTO = reactionOrError.getValue();
      return res.json(reactionDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  /**public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const postsOrError = await this.postServiceInstance.getAllPosts() as Result<IPostDTO[]>;
        //Failure
      if (postsOrError.isFailure) {
        return res.status(402).send();
      }
    //Created
      const postsDTO = postsOrError.getValue();
      return res.json( postsDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async removePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = await this.postServiceInstance.removePost(req.params.id as string) as Result<IPostDTO>;
        //Failure
      if (postOrError.isFailure) {
        return res.status(402).send();
      }
    //Created
      const postDTO = postOrError.getValue();
      return res.json( postDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = await this.postServiceInstance.updatePost(req.body as IPostDTO) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(404).send();
      }

      const postDTO = postOrError.getValue();
      return res.status(201).json( postDTO );
    }
    catch (e) {
     return next(e);
    }
   };*/
  public async createReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const reactionOrError =
        (await this.reactionServiceInstance.createReaction(
          req.body as IUserReactionDTO
        )) as Result<IUserReactionDTO>;
      //Failure

      if (reactionOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const reactionDTO = reactionOrError.getValue();
      return res.json(reactionDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
