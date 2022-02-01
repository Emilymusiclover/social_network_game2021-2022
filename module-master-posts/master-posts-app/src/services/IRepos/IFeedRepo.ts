import { Repo } from "../../core/infra/Repo";
import { Feed } from "../../domain/feed";
import { FeedId } from "../../domain/feedId";

export default interface IFeedRepo extends Repo<Feed> {
  save(feed: Feed): Promise<Feed>;
  getAll(): Promise<Feed[]>;
  findByDomainId(feedId: FeedId | string): Promise<Feed>;
  findByUserId(userId: string): Promise<Feed>;
  remove(feedId: FeedId | string): Promise<Feed>;
}
