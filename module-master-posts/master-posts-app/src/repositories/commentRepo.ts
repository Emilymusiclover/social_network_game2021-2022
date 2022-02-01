import { Service, Inject } from "typedi";

import ICommentRepo from "../services/IRepos/ICommentRepo";
import { Comment } from "../domain/comment";
import { CommentId } from "../domain/commentId";
import { CommentMap } from "../mappers/CommentMap";
import { PostId } from "../domain/postId";
import { Document, FilterQuery, Model } from "mongoose";
import { IPostPersistence } from "../dataschema/IPostPersistence";
import { ICommentPersistence } from "../dataschema/ICommentPersistence";

@Service()
export default class CommentRepo implements ICommentRepo {
  private models: any;

  constructor(
    @Inject("commentSchema")
    private commentSchema: Model<ICommentPersistence & Document>,
    @Inject("postSchema") private postSchema: Model<IPostPersistence & Document>
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(comment: Comment): Promise<boolean> {
    const idX =
      comment.id instanceof CommentId
        ? (<CommentId>comment.id).toValue()
        : comment.id;
    const query = { Id: idX };
    const commentDocument = await this.commentSchema.findOne(
      query as FilterQuery<ICommentPersistence & Document>
    );

    return !!commentDocument === true;
  }

  public async save(comment: Comment): Promise<Comment> {
    const query = { Id: comment.id.toString() };
    const commentDocument = await this.commentSchema.findOne(query);

    try {
      if (commentDocument === null) {
        const rawComment: any = CommentMap.toPersistence(comment);
        const commentCreated = await this.commentSchema.create(rawComment);
        return CommentMap.toDomain(commentCreated);
      } else {
        commentDocument.text = comment.text;
        await commentDocument.save();
        return comment;
      }
    } catch (err) {
      throw err;
    }
  }

  public async remove(commentId: CommentId | string): Promise<Comment> {
    const query = { Id: commentId };
    const commentRecord = await this.commentSchema.findOneAndRemove(
      query as FilterQuery<ICommentPersistence & Document>
    );

    if (commentRecord != null) {
      return CommentMap.toDomain(commentRecord);
    } else return null;
  }

  public async findByDomainId(postId: CommentId | string): Promise<Comment> {
    const query = { Id: postId };
    const commentRecord = await this.commentSchema.findOne(
      query as FilterQuery<ICommentPersistence & Document>
    );

    if (commentRecord != null) {
      return CommentMap.toDomain(commentRecord);
    } else return null;
  }

  public async getAll(): Promise<Comment[]> {
    const commentRecord = await this.commentSchema.find({});
    const commentArray = [];
    if (commentRecord != null) {
      commentRecord.forEach((post) => {
        let postAdd = CommentMap.toDomain(post);
        commentArray.push(postAdd);
      });
      // console.log(postRecord);
      return commentArray;
    } else return null;
  }

  public async savePost(
    postId: PostId | string,
    comment: Comment
  ): Promise<Comment> {
    const query = { Id: comment.id.toString() };

    const commentDocument = await this.commentSchema.findOne(query);

    try {
      if (commentDocument === null) {
        const rawComment: any = CommentMap.toPersistence(comment);

        const commentCreated = await this.commentSchema.create(rawComment);
        const postQuery = { Id: postId };
        const postRecord = await this.postSchema.findOneAndUpdate(postQuery, {
          $push: { comments: commentCreated._id },
        });
        return CommentMap.toDomain(commentCreated);
      } else {
        commentDocument.text = comment.text;
        await commentDocument.save();

        return comment;
      }
    } catch (err) {
      throw err;
    }
  }
}
