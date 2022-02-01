"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReactionMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const userReaction_1 = require("../domain/userReaction");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class UserReactionMap extends Mapper_1.Mapper {
    //Convert toDTO post object
    static toDTO(reaction) {
        return {
            id: reaction.id.toString(),
            value: reaction.value.toString(),
        };
    }
    //
    static async toDomain(reaction) {
        const reactionOrError = userReaction_1.userReaction.create(reaction, new UniqueEntityID_1.UniqueEntityID(reaction.Id));
        reactionOrError.isFailure ? console.log(reactionOrError.error) : '';
        return reactionOrError.isSuccess ? reactionOrError.getValue() : null;
    }
    static toPersistence(reaction) {
        return {
            id: reaction.id.toString(),
            value: reaction.value,
        };
    }
}
exports.UserReactionMap = UserReactionMap;
//# sourceMappingURL=UserReactionMap.js.map