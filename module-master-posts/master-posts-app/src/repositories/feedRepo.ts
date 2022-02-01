import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";

import IFeedRepo from "../services/IRepos/IFeedRepo";
import { IFeedPersistence } from "../dataschema/IFeedPersistence";
import { Feed } from "../domain/feed";
import { FeedId } from "../domain/feedId";
import { FeedMap } from "../mappers/FeedMap";

@Service()
export default class FeedRepo implements IFeedRepo {
  constructor(
    @Inject("feedSchema")
    private feedSchema: Model<IFeedPersistence & Document> // @Inject("postSchema") // private postSchema: Model<IPostPersistence & Document>
  ) {}

  public async exists(feed: Feed): Promise<boolean> {
    const query = { Id: feed.id.toString() };
    const doc = await this.feedSchema.findOne(query);
    return doc !== null;
  }

  public async save(feed: Feed): Promise<Feed> {
    // check if object exits
    if (await this.exists(feed)) return null;

    // create new object
    const rawFeed: any = FeedMap.toPersistence(feed);
    const newFeed = await this.feedSchema.create(rawFeed);
    return FeedMap.toDomain(newFeed);
  }

  public async getAll(): Promise<Feed[]> {
    const records = await this.feedSchema
      .find({} as FilterQuery<IFeedPersistence & Document>)
      .populate("posts", "-_id -__v");
    // console.log(`FeedRepo : records = ${JSON.stringify(records)}`);

    const feeds: Feed[] = [];
    if (records == null) return null;

    records.forEach(async (feed) => {
      let domainFeed = await FeedMap.toDomain(feed);
      feeds.push(domainFeed);
    });

    return feeds;
  }

  public async findByDomainId(feedId: string | FeedId): Promise<Feed> {
    const query = { Id: feedId };
    const doc = await this.feedSchema
      .findOne(query)
      .populate("posts", "-_id -__v");
    return doc === null ? null : FeedMap.toDomain(doc);
  }

  public async findByUserId(userId: string): Promise<Feed> {
    const query = { userId: userId };
    const doc = await this.feedSchema
      .findOne(query)
      .populate("posts", "-_id -__v");
    return doc === null ? null : FeedMap.toDomain(doc);
  }

  public async remove(feedId: string | FeedId): Promise<Feed> {
    const query = { Id: feedId };
    const doc = await this.feedSchema
      .findOneAndDelete(query)
      .populate("posts", "-_id -__v");
    return doc === null ? null : FeedMap.toDomain(doc);
  }
}
