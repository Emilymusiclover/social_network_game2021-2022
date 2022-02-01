"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const commentId_1 = require("./commentId");
class Comment extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get commentId() {
        return new commentId_1.CommentId(this.commentId.toValue());
    }
    get text() {
        return this.props.text;
    }
    set text(value) {
        this.props.text = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const comment = new Comment(Object.assign({}, props), id);
        return Result_1.Result.ok(comment);
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map