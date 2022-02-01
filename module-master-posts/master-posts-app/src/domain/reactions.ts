
import { Entity } from "../core/domain/Entity";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { count } from "console";

import {userReaction }from "./userReaction";
import {ReactionsId} from "./reactionsId"
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
interface ReactionsProps {
  valuesLikes:userReaction[],
  valuesDislike:userReaction[]
}



export class Reactions extends Entity<ReactionsProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get reactionsId (): ReactionsId {
    return new ReactionsId(this.reactionsId.toValue());
  }
  get valuesLikes (): userReaction[] {
    return this.props.valuesLikes;
  }

  get valuesDislikes ():userReaction[] {
    return this.props.valuesDislike;
  }
  

  private constructor (props: ReactionsProps,id?: UniqueEntityID) {
    super(props,id);
  }




  public static create (props: ReactionsProps,id?: UniqueEntityID): Result<Reactions> {

    
      return Result.ok<Reactions>(new Reactions({ ...props},id))
    }
  
}