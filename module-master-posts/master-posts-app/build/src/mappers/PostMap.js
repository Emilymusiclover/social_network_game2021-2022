"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const post_1 = require("../domain/post");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class PostMap extends Mapper_1.Mapper {
    // convert toDTO post object
    static toDTO(post) {
        return {
            feedId: post.feedId.toString(),
            Id: post.id.toString(),
            text: post.text,
            comments: post.comments,
            // reactions:post.reactions
        };
    }
    static async toDomain(post) {
        const postOrError = post_1.Post.create({
            feedId: post.feedId.toString(),
            text: post.text,
            comments: post.comments,
            // reactions:post.reactions
        }, new UniqueEntityID_1.UniqueEntityID(post.Id));
        postOrError.isFailure ? console.log(postOrError.error) : '';
        return postOrError.isSuccess ? postOrError.getValue() : null;
    }
    static toPersistence(post) {
        return {
            feedId: post.feedId.toString(),
            Id: post.id.toString(),
            text: post.text,
            comments: post.comments,
            // reactions:post.reactions
        };
    }
}
exports.PostMap = PostMap;
//# sourceMappingURL=PostMap.js.map