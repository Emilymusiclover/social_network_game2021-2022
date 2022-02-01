import {userReaction }from "../domain/userReaction";


export default interface IReactionsDto {
    id: string;
    valuesLikes:userReaction[],
    valuesDislike:userReaction[]
  }