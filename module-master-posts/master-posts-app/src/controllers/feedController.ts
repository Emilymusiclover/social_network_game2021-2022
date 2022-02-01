import config from "../../config";

import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import https from "https";
import axios from "axios";

import IFeedController from "./IControllers/IFeedController";
import IFeedService from "../services/IServices/IFeedService";
import IFeedDto from "../dto/IFeedDto";
import { Result } from "../core/logic/Result";
import { resourceLimits } from "worker_threads";

@Service()
export default class FeedController implements IFeedController {
  constructor(
    @Inject(config.services.feed.name) private feedServiceInstance: IFeedService
  ) {}

  public async validateUser(req: Request, res: Response, next: NextFunction) {
    let feed = req.body as IFeedDto;
    let id = feed.userId;
    if (!id) id = req.params.id as string;
    let url = `${config.masterDataURL}/api/users/${id}`;

    const instance = axios.create({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    instance
      .get(url)
      .then((res) => next())
      .catch((err) => {
        if (!err.response) {
          error("master data did not respond");
        } else if (err.response.status === 400) {
          error("master data user not found");
        } else {
          error(`master data invalid response status : ${err.response.status}`);
        }
      });

    const error = (message: string) => {
      res.status(500);
      res.send({ error: message });
    };
  }

  public async createFeed(req: Request, res: Response, next: NextFunction) {
    try {
      let createFeedDto = req.body as IFeedDto;
      let result: Result<IFeedDto> = await this.feedServiceInstance.createFeed(
        createFeedDto
      );

      if (result.isFailure) {
        return res
          .status(400)
          .send({ controller_error: result.errorValue() })
          .end();
      }

      let feedDto: IFeedDto = result.getValue();
      return res.status(201).json(feedDto);
    } catch (error) {
      next(error);
    }
  }

  public async getAllFeeds(req: Request, res: Response, next: NextFunction) {
    try {
      let result: Result<IFeedDto[]> =
        await this.feedServiceInstance.getAllFeeds();

      if (result.isFailure) {
        return res
          .status(400)
          .send({ controller_error: result.errorValue() })
          .end();
      }

      const feedsDto = result.getValue();
      return res.status(200).json(feedsDto);
    } catch (error) {
      next(error);
    }
  }

  public async getFeed(req: Request, res: Response, next: NextFunction) {
    try {
      let result: Result<IFeedDto> = await this.feedServiceInstance.getFeed(
        req.params.id as string
      );

      if (result.isFailure) {
        return res
          .status(400)
          .send({ controller_error: result.errorValue() })
          .end();
      }

      let feedDto: IFeedDto = result.getValue();
      return res.status(200).json(feedDto);
    } catch (error) {
      next(error);
    }
  }

  public async getFeedByUser(req: Request, res: Response, next: NextFunction) {
    try {
      let result: Result<IFeedDto> =
        await this.feedServiceInstance.getFeedByUser(req.params.id as string);

      if (result.isFailure) {
        return res
          .status(400)
          .send({ controller_error: result.errorValue() })
          .end();
      }

      let feedDto: IFeedDto = result.getValue();
      return res.status(200).json(feedDto);
    } catch (error) {
      next(error);
    }
  }

  public async removeFeed(req: Request, res: Response, next: NextFunction) {
    try {
      let result: Result<IFeedDto> = await this.feedServiceInstance.removeFeed(
        req.params.id as string
      );

      if (result.isFailure) {
        return res
          .status(400)
          .send({ controller_error: result.errorValue() })
          .end();
      }

      let feedDto: IFeedDto = result.getValue();
      return res.status(200).json(feedDto);
    } catch (error) {
      next(error);
    }
  }

  public updateFeed(req: Request, res: Response, next: NextFunction) {
    throw new Error("Method not implemented.");
  }
}
