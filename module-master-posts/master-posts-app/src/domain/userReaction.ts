
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { userReactionId }from "./userReactionId";
import IUserReactionDTO from "../dto/IUserReactionDto";
import { Guard } from "../core/logic/Guard";
import { count } from "console";
import {ReactionsValues} from "./ReactionsValues"
interface ReactionProps {
  
  value: ReactionsValues.LIKE|ReactionsValues.DISLIKE;

}



export class userReaction extends Entity<ReactionProps> {

    get id (): UniqueEntityID {
        return this._id;
      }

      get reactionId (): userReactionId {
        return new userReactionId(this.reactionId.toValue());
      }
  get value (): ReactionsValues {
    return this.props.value;
  }

 
  
  private constructor (props: ReactionProps,id?: UniqueEntityID) {
    super(props,id);
  }

  public static convertStringToReactionValue(reaction: string):ReactionsValues{
      if(reaction==="LIKE"){
        return ReactionsValues.LIKE
      }else if(reaction==="DISLIKE"){
          return ReactionsValues.DISLIKE
      }else{
        return null
      }
  
  }


  public static create (reactionDTO:IUserReactionDTO ,id?: UniqueEntityID): Result<userReaction> {
    

   
     const value=this.convertStringToReactionValue(reactionDTO.value);

    if(value==null){
      Result.fail<userReaction>('Invalid')
    }


      return Result.ok<userReaction>(new userReaction({value:value},id));
    }
  
}