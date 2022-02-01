import { Service, Inject } from 'typedi';

import IReactionsRepo from "../services/IRepos/IReactionsRepo";
import { Reactions } from "../domain/reactions";
import { ReactionsId } from "../domain/reactionsId";
import { ReactionsMap } from "../mappers/ReactionsMap";
import { PostId } from "../domain/postId";
import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';
import { IReactionsPersistence } from '../dataschema/IReactionsPersistence';

@Service()
export default class ReactionsRepo implements IReactionsRepo {
  private models: any;
  
  constructor(
    @Inject('reactionsSchema') private reactionsSchema : Model<IReactionsPersistence & Document>,
    @Inject('postSchema') private postSchema : Model<IPostPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(reactions: Reactions): Promise<boolean> {
    
    const idX = reactions.id instanceof ReactionsId ? (<ReactionsId>reactions.id).toValue() : reactions.id;

    const query = { Id: idX}; 
    const reactionsDocument = await this.reactionsSchema.findOne( query as FilterQuery<IReactionsPersistence & Document>);

    return !!reactionsDocument === true;
  }

  
  public async save (reactions:Reactions): Promise<Reactions> {
    const query = { Id:reactions.id.toString()}; 

    const reactionsDocument = await this.reactionsSchema.findOne( query );

    try {
      if (reactionsDocument === null ) {
        const rawReactions: any = ReactionsMap.toPersistence(reactions);

        const reactionsCreated = await this.reactionsSchema.create(rawReactions);
       
        return ReactionsMap.toDomain(reactionsCreated);
      } else {
        
        await reactionsDocument.save();

        return reactions;
      }
    } catch (err) {
      throw err;
    }
    
  
  

  }
 

  /**public async remove (commentId:CommentId | string): Promise<Comment> {
    const query = { Id: commentId};
    const commentRecord = await this.commentSchema.findOneAndRemove( query as FilterQuery<ICommentPersistence & Document> );
    
    if( commentRecord != null) {
      
      return CommentMap.toDomain(commentRecord);

    }
    else
      return null;
  }
*/
  public async  findByDomainId (reactionsId: ReactionsId | string): Promise<Reactions> {
    const query = { Id: reactionsId};
    const reactionsRecord = await this.reactionsSchema.findOne( query as FilterQuery<IReactionsPersistence & Document> );

    if( reactionsRecord != null) {
      return ReactionsMap.toDomain(reactionsRecord);
    }
    else
      return null;
  }

 

  public async savePost (postId:PostId | string,reactions:Reactions): Promise<Reactions> {
    const query = { Id:reactions.id.toString()}; 

    const reactionsDocument = await this.reactionsSchema.findOne( query );

    try {
      if (reactionsDocument === null ) {
        const rawReactions: any = ReactionsMap.toPersistence(reactions);

        const reactionsCreated = await this.reactionsSchema.create(rawReactions);
        const postQuery={ Id: postId}; 
        const postRecord = await this.postSchema.findOneAndUpdate(postQuery,
          { $push: { reactions: reactionsCreated._id }}
    
          );
        return ReactionsMap.toDomain(reactionsCreated);
      } else {
        
        await reactionsDocument.save();

        return reactions;
      }
    } catch (err) {
      throw err;
    }
    
  
  

  }

}