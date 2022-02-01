import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';  //Database MONGODB

import IUserReactionPersistence from '../dataschema/IUserReactionPersistence';

import IUserReactionDTO from "../dto/IUserReactionDto";
import { userReaction } from "../domain/userReaction";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class UserReactionMap extends Mapper<userReaction> {
  //Convert toDTO post object
  public static toDTO( reaction: userReaction): IUserReactionDTO {
    return {
      id: reaction.id.toString(),
      value:reaction.value.toString(),
    } as IUserReactionDTO;
  }
  //
  public  static  async toDomain (reaction: any  ): Promise<userReaction> {
    const reactionOrError = userReaction.create(reaction ,
      new UniqueEntityID(reaction.Id));
      reactionOrError.isFailure ? console.log(reactionOrError.error) : '';

    return reactionOrError.isSuccess ? reactionOrError.getValue() : null;
  }

  public static toPersistence (reaction: userReaction): any {
    return {
        id: reaction.id.toString(),
        value:reaction.value,

    }
  }
}