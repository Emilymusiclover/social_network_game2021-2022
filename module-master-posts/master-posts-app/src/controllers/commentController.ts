import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi"; //TypeScript Dependecy injection
import config from "../../config";

import ICommentController from "./IControllers/ICommentController";
import ICommentService from "../services/IServices/ICommentService";
import ICommentDTO from "../dto/ICommentDto";

import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";
import { CommentId } from "../domain/commentId";

@Service()
export default class CommentController
  implements
    ICommentController /* TODO: extends ../core/infra/BaseController */
{
  constructor(
    @Inject(config.services.comment.name)
    private commentServiceInstance: ICommentService //Service injection
  ) {}

  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = (await this.commentServiceInstance.createComment(
        req.body as ICommentDTO
      )) as Result<ICommentDTO>;
      //Failure
      if (commentOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const commentDTO = commentOrError.getValue();
      return res.json(commentDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = (await this.commentServiceInstance.getComment(
        req.params.id as string
      )) as Result<ICommentDTO>;
      //Failure
      if (commentOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const commentDTO = commentOrError.getValue();
      return res.json(commentDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async removeComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = (await this.commentServiceInstance.removeComment(
        req.params.id as string
      )) as Result<ICommentDTO>;
      //Failure
      if (commentOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const commentDTO = commentOrError.getValue();
      return res.json(commentDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
  public async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentOrError = (await this.commentServiceInstance.updateComment(
        req.body as ICommentDTO
      )) as Result<ICommentDTO>;

      if (commentOrError.isFailure) {
        return res.status(404).send();
      }

      const commentDTO = commentOrError.getValue();
      return res.status(201).json(commentDTO);
    } catch (e) {
      return next(e);
    }
  }
}
