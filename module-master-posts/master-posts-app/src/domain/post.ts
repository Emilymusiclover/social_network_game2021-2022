import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PostId } from "./postId";
import { Comment } from "./comment"
import { Reactions } from "./reactions"
import IPostDto from "../dto/IPostDto";
import ICommentDto from "../dto/ICommentDto";
import {FeedId} from "./feedId"
import { Guard } from "../core/logic/Guard";

interface PostProps {
  feedId:string;
  text: string;
  comments: Comment[];
  //reactions:Reactions;
}

export class Post extends AggregateRoot<PostProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get postId(): PostId {
    return new PostId(this.postId.toValue());
  }

  

  get feedId(): string {
    return this.props.feedId;
  }

  get text(): string {
    return this.props.text;
  }

  set text(value: string) {
    this.props.text = value;
  }

  get comments(): Comment[] {
    return this.props.comments;
  }

  set comments(value: Comment[]) {
    this.props.comments = value;
  }

  /*
   get reactions (): Reactions {
     return this.props.reactions;
   }
 
   set reactions ( reaction: Reactions) {
     this.props.reactions =reaction;
   }
   */

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PostProps, id?: UniqueEntityID): Result<Post> {


    /*
    const guardedProps = [
      { argument: props.text, argumentName: 'text' },
      { argument: props.comments, argumentName: 'comments' },
     
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message)
    }     
    else {
    */

    const post = new Post({
      ...props
    }, id);

    return Result.ok<Post>(post);
  }

}