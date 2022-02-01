"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const postId_1 = require("./postId");
class Post extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get postId() {
        return new postId_1.PostId(this.postId.toValue());
    }
    get feedId() {
        return this.props.feedId;
    }
    get text() {
        return this.props.text;
    }
    set text(value) {
        this.props.text = value;
    }
    get comments() {
        return this.props.comments;
    }
    set comments(value) {
        this.props.comments = value;
    }
    /*
     get reactions (): Reactions {
       return this.props.reactions;
     }
   
     set reactions ( reaction: Reactions) {
       this.props.reactions =reaction;
     }
     */
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        /*
        const guardedProps = [
          { argument: props.text, argumentName: 'text' },
          { argument: props.comments, argumentName: 'comments' },
         
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
          return Result.fail<Post>(guardResult.message)
        }
        else {
        */
        const post = new Post(Object.assign({}, props), id);
        return Result_1.Result.ok(post);
    }
}
exports.Post = Post;
//# sourceMappingURL=post.js.map