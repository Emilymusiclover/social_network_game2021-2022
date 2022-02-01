import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { CommentId } from "./commentId";

import ICommentDto from "../dto/ICommentDto";

interface CommentProps {
  text: string;
}

export class Comment extends AggregateRoot<CommentProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get commentId(): CommentId {
    return new CommentId(this.commentId.toValue());
  }

  get text(): string {
    return this.props.text;
  }

  set text(value: string) {
    this.props.text = value;
  }

  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CommentProps, id?: UniqueEntityID): Result<Comment> {
    const comment = new Comment({
      ...props
    }, id);

    return Result.ok<Comment>(comment);
  }
}