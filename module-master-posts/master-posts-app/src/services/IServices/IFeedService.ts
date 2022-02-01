import { Result } from "../../core/logic/Result";
import IFeedDto from "../../dto/IFeedDto";

export default interface IFeedService {
  createFeed(feedDto: IFeedDto): Promise<Result<IFeedDto>>;
  getFeed(feedId: string): Promise<Result<IFeedDto>>;
  getAllFeeds(): Promise<Result<IFeedDto[]>>;
  getFeedByUser(userId: string): Promise<Result<IFeedDto>>;
  removeFeed(feedId: string): Promise<Result<IFeedDto>>;
  updateFeed(feedDto: IFeedDto): Promise<Result<IFeedDto>>;
}
