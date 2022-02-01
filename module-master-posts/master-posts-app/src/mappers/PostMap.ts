import { Mapper } from "../core/infra/Mapper";
import { Container } from 'typedi';
import { Document, Model } from 'mongoose';  // database MONGODB

import { IPostPersistence } from '../dataschema/IPostPersistence';
import IPostDTO from "../dto/IPostDto";
import { Post } from "../domain/post";
import CommentRepo from "../repositories/commentRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CommentMap } from "./CommentMap";
import { Reactions } from "../domain/reactions";

export class PostMap extends Mapper<Post> {

  // convert toDTO post object
  public static toDTO(post: Post): IPostDTO {
    return {
      feedId:post.feedId.toString(),
      Id: post.id.toString(),
      text: post.text,
      comments: post.comments,
      // reactions:post.reactions
    } as IPostDTO;
  }

  public static async toDomain(post: any): Promise<Post> {
    const postOrError = Post.create({
      feedId:post.feedId.toString(),
      text: post.text,
      comments: post.comments,
      // reactions:post.reactions
    }, new UniqueEntityID(post.Id));

    postOrError.isFailure ? console.log(postOrError.error) : '';
    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  public static toPersistence(post: Post): any {
    return {
      feedId:post.feedId.toString(),
      Id: post.id.toString(),
      text: post.text,
      comments: post.comments,
      // reactions:post.reactions
    }
  }

}