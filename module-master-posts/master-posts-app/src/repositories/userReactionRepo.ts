import { Service, Inject } from 'typedi';

import IUserReactionRepo from "../services/IRepos/IUserReactionRepo";
import { userReaction } from "../domain/userReaction";
import { userReactionId } from "../domain/userReactionId";
import { UserReactionMap } from "../mappers/UserReactionMap";

import { Document, FilterQuery, Model } from 'mongoose';

import IUserReactionPersistence from '../dataschema/IUserReactionPersistence';

@Service()
export default class UserReactionRepo implements IUserReactionRepo {
  private models: any;
  
  constructor(
    @Inject('userReactionSchema') private reactionSchema : Model<IUserReactionPersistence & Document>,
 
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(reaction: userReaction): Promise<boolean> {
    
    const idX = reaction.id instanceof userReactionId ? (<userReactionId>reaction.id).toValue() : reaction.id;

    const query = { Id: idX}; 
    const reactionDocument = await this.reactionSchema.findOne( query as FilterQuery<IUserReactionPersistence & Document>);

    return !!reactionDocument === true;
  }

  
  public async save (reaction:userReaction): Promise<userReaction> {
    const query = { Id:reaction.id.toString()}; 

    const reactionDocument = await this.reactionSchema.findOne( query );

    try {
      if (reactionDocument === null ) {
        const rawReaction= UserReactionMap.toPersistence(reaction);

        const reactionCreated = await this.reactionSchema.create(rawReaction);
       
        return UserReactionMap.toDomain(reactionCreated);
      } else {
        
        await reactionDocument.save();

        return reaction;
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
  public async  findByDomainId (reactionId: userReactionId | string): Promise<userReaction> {
    const query = { Id: reactionId};
    const reactionRecord = await this.reactionSchema.findOne( query as FilterQuery<IUserReactionPersistence & Document> );

    if( reactionRecord != null) {
      return UserReactionMap.toDomain(reactionRecord);
    }
    else
      return null;
  }

 

  
  
  

  

}