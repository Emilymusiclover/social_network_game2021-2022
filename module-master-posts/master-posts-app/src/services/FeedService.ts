import config from "../../config";

import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";

import IFeedDto from "../dto/IFeedDto";
import IFeedRepo from "./IRepos/IFeedRepo";
import IFeedService from "./IServices/IFeedService";
import { Feed } from "../domain/feed";
import { FeedMap } from "../mappers/FeedMap";

@Service()
export default class FeedService implements IFeedService {
  constructor(@Inject(config.repos.feed.name) private feedRepo: IFeedRepo) {}

  public async createFeed(feedDto: IFeedDto): Promise<Result<IFeedDto>> {
    try {
      let createFeed = Feed.create(feedDto);

      if (createFeed.isFailure) {
        return Result.fail<IFeedDto>(createFeed.errorValue());
      } else {
        let feed = createFeed.getValue();
        await this.feedRepo.save(feed);
        const savedDto = FeedMap.toDTO(feed) as IFeedDto;
        return Result.ok<IFeedDto>(savedDto);
      }
    } catch (error) {
      throw error;
    }
  }

  public async getFeed(feedId: string): Promise<Result<IFeedDto>> {
    try {
      const feed = await this.feedRepo.findByDomainId(feedId);
      if (feed === null) {
        return Result.fail<IFeedDto>("Feed not found");
      }
      const feedDto = FeedMap.toDTO(feed) as IFeedDto;
      return Result.ok<IFeedDto>(feedDto);
    } catch (error) {
      throw error;
    }
  }

  public async getAllFeeds(): Promise<Result<IFeedDto[]>> {
    try {
      const feeds = await this.feedRepo.getAll();
      if (feeds === null) {
        return Result.fail<IFeedDto[]>("Feeds not found");
      }
      // console.log(`FeedService : feeds = ${JSON.stringify(feeds)}`);

      const dtos: IFeedDto[] = [];
      feeds.forEach((feed) => {
        const feedDto = FeedMap.toDTO(feed) as IFeedDto;
        dtos.push(feedDto);
      });

      return Result.ok<IFeedDto[]>(dtos);
    } catch (error) {
      throw error;
    }
  }

  public async getFeedByUser(userId: string): Promise<Result<IFeedDto>> {
    try {
      const feed = await this.feedRepo.findByUserId(userId);
      if (feed === null) {
        return Result.fail<IFeedDto>("Feed not found");
      }
      const feedDto = FeedMap.toDTO(feed) as IFeedDto;
      return Result.ok<IFeedDto>(feedDto);
    } catch (error) {
      throw error;
    }
  }

  public async removeFeed(feedId: string): Promise<Result<IFeedDto>> {
    try {
      const feed = await this.feedRepo.remove(feedId);
      if (feed === null) {
        return Result.fail<IFeedDto>("Feed not found");
      }
      const feedDto = FeedMap.toDTO(feed) as IFeedDto;
      return Result.ok<IFeedDto>(feedDto);
    } catch (error) {
      throw error;
    }
  }

  public async updateFeed(feedDto: IFeedDto): Promise<Result<IFeedDto>> {
    // should only allow to update posts[]
    throw new Error("Method not implemented.");
  }
}
