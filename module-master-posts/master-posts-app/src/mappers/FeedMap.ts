import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Feed } from "../domain/feed";
import IFeedDto from "../dto/IFeedDto";

export class FeedMap extends Mapper<Feed> {

  public static toDTO(feed: Feed): IFeedDto {
    // console.log(`FeedMap toDTO: feed = ${JSON.stringify(feed)}`);
    return {
      Id: feed.id.toString(),
      userId: feed.userId,
      posts: feed.posts,
    } as IFeedDto;
  }

  public static async toDomain(feed: any): Promise<Feed> {
    // console.log(`FeedMap toDomain: feed = ${JSON.stringify(feed)}`);
    const newFeed = Feed.create({
      userId: feed.userId,
      posts: feed.posts,
    }, new UniqueEntityID(feed.Id));

    if (newFeed.isFailure) {
      console.log(newFeed.errorValue);
      return null
    }
    return newFeed.getValue()
  }

  public static toPersistence(feed: Feed): any {
    // console.log(`FeedMap toPersistence: feed = ${JSON.stringify(feed)}`);
    return {
      Id: feed.id.toString(),
      userId: feed.userId,
      posts: feed.posts,
    }
  }

}