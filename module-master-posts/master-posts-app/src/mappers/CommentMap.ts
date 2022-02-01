import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';  //Database MONGODB

import { ICommentPersistence } from '../dataschema/ICommentPersistence';

import ICommentDTO from "../dto/ICommentDto";
import { Comment } from "../domain/comment";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class CommentMap extends Mapper<Comment> {
  //Convert toDTO post object
  public static toDTO( comment: Comment): ICommentDTO {
    return {
      id: comment.id.toString(),
      text: comment.text,
    } as ICommentDTO;
  }
  //
  public  static async toDomain (comment: any ): Promise<Comment> {
    const commentOrError = Comment.create({
        text:comment.text,
     } ,
      new UniqueEntityID(comment.Id));

    commentOrError.isFailure ? console.log(commentOrError.error) : '';

    return commentOrError.isSuccess ? commentOrError.getValue() : null;
  }

  public static toPersistence (comment: Comment): any {
    return {
      Id: comment.id.toString(),
      text: comment.text
    }
  }
}