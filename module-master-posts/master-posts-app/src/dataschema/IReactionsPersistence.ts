import {userReaction} from "../domain/userReaction"
export interface IReactionsPersistence {
    Id: string;
    valuesLikes:userReaction[],
    valuesDislike:userReaction[]
  }