import { Service, Inject } from "typedi";

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post";
import { Feed } from "../domain/feed";
import { Comment } from "../domain/comment";
import { PostId } from "../domain/postId";
import { FeedId } from "../domain/feedId";
import { PostMap } from "../mappers/PostMap";
import { IFeedPersistence } from "../dataschema/IFeedPersistence";
import { Document, FilterQuery, Model } from "mongoose";
import { IPostPersistence } from "../dataschema/IPostPersistence";
import { ICommentPersistence } from "../dataschema/ICommentPersistence";
import { FeedMap } from "../mappers/FeedMap";
@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(
    @Inject("postSchema")
    private postSchema: Model<IPostPersistence & Document>,
    @Inject("commentSchema")
    private commentSchema: Model<ICommentPersistence & Document>,
    @Inject("feedSchema")
    private feedSchema: Model<IFeedPersistence & Document> 
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(post: Post): Promise<boolean> {
    const idX =
      post.id instanceof PostId ? (<PostId>post.id).toValue() : post.id;

    const query = { Id: idX };
    const postDocument = await this.postSchema.findOne(
      query as FilterQuery<IPostPersistence & Document>
    );

    return !!postDocument === true;
  }

  public async save(post: Post ): Promise<Post> {
    const query = { Id: post.id.toString() };
 
    const queryFeed = {feedId:post.feedId.toString()};

    const feedDoc = await this.feedSchema.findOne(queryFeed);
   
    
    
    const postDocument = await this.postSchema.findOne(query);

    try {
      if (postDocument === null) {
        const rawPost: any = PostMap.toPersistence(post);

        const postCreated = await this.postSchema.create(rawPost);
        const feedRecord = await this.feedSchema.findOneAndUpdate(queryFeed, {
          $push: { posts: postCreated._id },
        });

        if(feedRecord===null){
          return null;
        }
        return PostMap.toDomain(postCreated);
      } else {
        postDocument.text = post.text;

        await postDocument.save();

        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  public async remove(postId: PostId | string): Promise<Post> {
    const query = { Id: postId };
    const postRecord = await this.postSchema.findOneAndRemove(
      query as FilterQuery<IPostPersistence & Document>
    );

    if (postRecord != null) {
      return PostMap.toDomain(postRecord);
    } else return null;
  }

  public async findByDomainId(postId: PostId | string): Promise<Post> {
    const query = { Id: postId };
    const postRecord = await this.postSchema
      .findOne(query)
      .populate("comments", "-_id -__v");

    if (postRecord != null) {
      return PostMap.toDomain(postRecord);
    } else return null;
  }

  public async getAll(): Promise<Post[]> {
    const postRecord = await this.postSchema
      .find({} as FilterQuery<IPostPersistence & Document>)
      .populate("comments", "-_id -__v");
    const postArray: Post[] = [];
    if (postRecord != null) {
      postRecord.forEach(async (post) => {
        let postAdd = await PostMap.toDomain(post);
        postArray.push(postAdd);
      });
      // console.log(postRecord);
      return postArray;
    } else return null;
  }

  


   
    
  
 
}
