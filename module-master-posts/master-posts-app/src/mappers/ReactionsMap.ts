import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';  //Database MONGODB

import { IReactionsPersistence } from '../dataschema/IReactionsPersistence';

import IReactionsDTO from "../dto/IReactionsDto";
import { Reactions } from "../domain/reactions";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ReactionsMap extends Mapper<Reactions> {
  //Convert toDTO post object
  public static toDTO( reactions: Reactions): IReactionsDTO {
    return {
      id: reactions.id.toString(),
      valuesLikes:reactions.valuesLikes,
      valuesDislike:reactions.valuesDislikes
    } as IReactionsDTO;
  }
  //
  public  static async toDomain (reactions: any ): Promise<Reactions> {
    const reactionsOrError = Reactions.create({
        valuesLikes:reactions.valuesLikes,
        valuesDislike:reactions.valuesDislikes
     } ,
      new UniqueEntityID(reactions.Id));
      reactionsOrError.isFailure ? console.log(reactionsOrError.error) : '';

    return reactionsOrError.isSuccess ? reactionsOrError.getValue() : null;
  }

  public static toPersistence (reactions: Reactions): any {
    return {
        id: reactions.id.toString(),
        valuesLikes:reactions.valuesLikes,
        valuesDislike:reactions.valuesDislikes
    }
  }
}