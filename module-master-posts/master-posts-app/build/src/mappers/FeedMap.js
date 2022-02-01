"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedMap = void 0;
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const feed_1 = require("../domain/feed");
class FeedMap extends Mapper_1.Mapper {
    static toDTO(feed) {
        // console.log(`FeedMap toDTO: feed = ${JSON.stringify(feed)}`);
        return {
            Id: feed.id.toString(),
            userId: feed.userId,
            posts: feed.posts,
        };
    }
    static async toDomain(feed) {
        // console.log(`FeedMap toDomain: feed = ${JSON.stringify(feed)}`);
        const newFeed = feed_1.Feed.create({
            userId: feed.userId,
            posts: feed.posts,
        }, new UniqueEntityID_1.UniqueEntityID(feed.Id));
        if (newFeed.isFailure) {
            console.log(newFeed.errorValue);
            return null;
        }
        return newFeed.getValue();
    }
    static toPersistence(feed) {
        // console.log(`FeedMap toPersistence: feed = ${JSON.stringify(feed)}`);
        return {
            Id: feed.id.toString(),
            userId: feed.userId,
            posts: feed.posts,
        };
    }
}
exports.FeedMap = FeedMap;
//# sourceMappingURL=FeedMap.js.map