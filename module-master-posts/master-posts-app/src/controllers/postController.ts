import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi"; //TypeScript Dependecy injection
import config from "../../config";

import IPostController from "./IControllers/IPostController";
import IPostService from "../services/IServices/IPostService";
import IFeedService from "../services/IServices/IFeedService";
import ICommentService from "../services/IServices/ICommentService";
import IPostDTO from "../dto/IPostDto";
import IFeedDTO from "../dto/IFeedDto";

import ICommentDTO from "../dto/ICommentDto";
import { Result } from "../core/logic/Result";
import { BaseController } from "../core/infra/BaseController";
import { PostId } from "../domain/postId";
import { FeedMap } from "../mappers/FeedMap";
import { CommentMap } from "../mappers/CommentMap";
import IFeedDto from "../dto/IFeedDto";
import ITextDto from "../dto/ITextDto";
import ICommentDto from "../dto/ICommentDto";

@Service() /* TODO: extends ../core/infra/BaseController */
export default class PostController implements IPostController {
  constructor(
    @Inject(config.services.post.name)
    private postServiceInstance: IPostService, //Service injection

    @Inject(config.services.feed.name)
    private feedServiceInstance: IFeedService,
    @Inject(config.services.comment.name)
    private commentServiceInstance: ICommentService
  ) {}

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id as string;

      const feedOrError = await this.feedServiceInstance.getFeedByUser(userId);
      if (feedOrError.isFailure) {
        const feed = { userId: userId } as IFeedDto;
        const createFeed = await this.feedServiceInstance.createFeed(feed);
        if (createFeed.isFailure) {
          return res.status(402).send();
        }
        const text = req.body as ITextDto;

        const textValue = text.text;
        const createPost = {
          feedId: createFeed.getValue().Id.toString(),
          text: textValue,
        } as IPostDTO;

        const post = (await this.postServiceInstance.createPost(
          createPost
        )) as Result<IPostDTO>;

        //Failure
        if (post.isFailure) {
          return res.status(402).send();
        }
        //Created
        const postDTO = post.getValue();
        return res.json(postDTO).status(201);
      } else {
        const text = req.body as ITextDto;

        const textValue = text.text;

        const createPostExists = {
          feedId: feedOrError.getValue().Id.toString(),
          text: textValue,
        } as IPostDTO;
        const postOrError = (await this.postServiceInstance.createPost(
          createPostExists
        )) as Result<IPostDTO>;

        //Failure
        if (postOrError.isFailure) {
          return res.status(402).send();
        }
        //Created
        const postDTO = postOrError.getValue();
        return res.json(postDTO).status(201);
      }
    } catch (e) {
      return next(e);
    }
  }

  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.getPost(
        req.params.id as string
      )) as Result<IPostDTO>;
      //Failure
      if (postOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const postsOrError =
        (await this.postServiceInstance.getAllPosts()) as Result<IPostDTO[]>;
      //Failure
      if (postsOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const postsDTO = postsOrError.getValue();
      return res.json(postsDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async removePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.removePost(
        req.params.id as string
      )) as Result<IPostDTO>;
      //Failure
      if (postOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.updatePost(
        req.body as IPostDTO
      )) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(404).send();
      }

      const postDTO = postOrError.getValue();
      return res.status(201).json(postDTO);
    } catch (e) {
      return next(e);
    }
  }
  public async createCommentPost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentOrError = (await this.postServiceInstance.createCommentPost(
        req.params.id as string,
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
  public async getCommentsPost(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const postOrError = (await this.postServiceInstance.getPost(
        req.params.id as string
      )) as Result<IPostDTO>;

      //Failure
      if (postOrError.isFailure) {
        return res.status(402).send();
      }
      //Created
      const post = postOrError.getValue();
      const comments = await post.comments;
      const commentsDTOArray = [];
      comments.forEach(async (c) => {
        let add = (await CommentMap.toDTO(c)) as ICommentDTO;
        commentsDTOArray.push(add);
      });

      return res.json(commentsDTOArray).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
