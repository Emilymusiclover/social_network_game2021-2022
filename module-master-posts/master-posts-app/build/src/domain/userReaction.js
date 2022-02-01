"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReaction = void 0;
const Entity_1 = require("../core/domain/Entity");
const Result_1 = require("../core/logic/Result");
const userReactionId_1 = require("./userReactionId");
class userReaction extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    get reactionId() {
        return new userReactionId_1.userReactionId(this.reactionId.toValue());
    }
    get value() {
        return this.props.value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static convertStringToReactionValue(reaction) {
        if (reaction === "LIKE") {
            return "LIKE" /* LIKE */;
        }
        else if (reaction === "DISLIKE") {
            return "DISLIKE" /* DISLIKE */;
        }
        else {
            return null;
        }
    }
    static create(reactionDTO, id) {
        const value = this.convertStringToReactionValue(reactionDTO.value);
        if (value == null) {
            Result_1.Result.fail('Invalid');
        }
        return Result_1.Result.ok(new userReaction({ value: value }, id));
    }
}
exports.userReaction = userReaction;
//# sourceMappingURL=userReaction.js.map