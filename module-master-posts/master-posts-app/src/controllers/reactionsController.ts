import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi"; //TypeScript Dependecy injection
import config from "../../config";

import IReactionsController from "./IControllers/IReactionsController";
import IReactionsService from "../services/IServices/IReactionsService";
import IPostDTO from "../dto/IPostDto";
import IReactionsDTO from "../dto/IReactionsDto";
import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";
import { PostId } from "../domain/postId";

@Service()
export default class ReactionsController
  implements
    IReactionsController /* TODO: extends ../core/infra/BaseController */
{
  constructor(
    @Inject(config.services.reactions.name)
    private reactionsServiceInstance: IReactionsService //Service injection
  ) {}

  public async getReactions(req: Request, res: Response, next: NextFunction) {
    try {
      const reactionsOrError = (await this.reactionsServiceInstance.getReaction(
        req.params.id as string
      )) as Result<IReactionsDTO>;
      //Failure
      if (reactionsOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const reactionsDTO = reactionsOrError.getValue();
      return res.json(reactionsDTO).status(201);
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
  public async createReactionsPost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reactionsOrError =
        (await this.reactionsServiceInstance.createReactionsPost(
          req.params.id as string,
          req.body as IReactionsDTO
        )) as Result<IReactionsDTO>;
      //Failure
      if (reactionsOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const reactionsDTO = reactionsOrError.getValue();
      return res.json(reactionsDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
