import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

import { FeedId } from "./feedId";
import IFeedDto from "../dto/IFeedDto";
import { Post } from "./post";

interface FeedProps {
  userId: string;
  posts: Post[];
}

export class Feed extends AggregateRoot<FeedProps> {

  get id(): UniqueEntityID {
    return this._id;
  }

  get feedId(): FeedId {
    return new FeedId(this.feedId.toValue());
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get posts(): Post[] {
    return this.props.posts;
  }

  set posts(value: Post[]) {
    this.props.posts = value;
  }

  private constructor(props: FeedProps, id?: UniqueEntityID) {
    super(props, id);
    // if (!props.posts) this.posts = []
  }

  public static create(props: FeedProps, id?: UniqueEntityID): Result<Feed> {
    const feed = new Feed({...props}, id);
    return Result.ok<Feed>(feed);
  }
  
}