"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reactions = void 0;
const Entity_1 = require("../core/domain/Entity");
const Result_1 = require("../core/logic/Result");
const reactionsId_1 = require("./reactionsId");
class Reactions extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    get reactionsId() {
        return new reactionsId_1.ReactionsId(this.reactionsId.toValue());
    }
    get valuesLikes() {
        return this.props.valuesLikes;
    }
    get valuesDislikes() {
        return this.props.valuesDislike;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return Result_1.Result.ok(new Reactions(Object.assign({}, props), id));
    }
}
exports.Reactions = Reactions;
//# sourceMappingURL=reactions.js.map