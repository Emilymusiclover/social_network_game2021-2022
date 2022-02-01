"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const reactions_1 = require("../domain/reactions");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class ReactionsMap extends Mapper_1.Mapper {
    //Convert toDTO post object
    static toDTO(reactions) {
        return {
            id: reactions.id.toString(),
            valuesLikes: reactions.valuesLikes,
            valuesDislike: reactions.valuesDislikes
        };
    }
    //
    static async toDomain(reactions) {
        const reactionsOrError = reactions_1.Reactions.create({
            valuesLikes: reactions.valuesLikes,
            valuesDislike: reactions.valuesDislikes
        }, new UniqueEntityID_1.UniqueEntityID(reactions.Id));
        reactionsOrError.isFailure ? console.log(reactionsOrError.error) : '';
        return reactionsOrError.isSuccess ? reactionsOrError.getValue() : null;
    }
    static toPersistence(reactions) {
        return {
            id: reactions.id.toString(),
            valuesLikes: reactions.valuesLikes,
            valuesDislike: reactions.valuesDislikes
        };
    }
}
exports.ReactionsMap = ReactionsMap;
//# sourceMappingURL=ReactionsMap.js.map