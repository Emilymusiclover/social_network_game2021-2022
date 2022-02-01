"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const feedId_1 = require("./feedId");
class Feed extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get feedId() {
        return new feedId_1.FeedId(this.feedId.toValue());
    }
    get userId() {
        return this.props.userId;
    }
    set userId(value) {
        this.props.userId = value;
    }
    get posts() {
        return this.props.posts;
    }
    set posts(value) {
        this.props.posts = value;
    }
    constructor(props, id) {
        super(props, id);
        // if (!props.posts) this.posts = []
    }
    static create(props, id) {
        const feed = new Feed(Object.assign({}, props), id);
        return Result_1.Result.ok(feed);
    }
}
exports.Feed = Feed;
//# sourceMappingURL=feed.js.map