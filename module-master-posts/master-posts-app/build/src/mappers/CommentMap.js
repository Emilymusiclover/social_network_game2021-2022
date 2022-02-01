"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const comment_1 = require("../domain/comment");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class CommentMap extends Mapper_1.Mapper {
    //Convert toDTO post object
    static toDTO(comment) {
        return {
            id: comment.id.toString(),
            text: comment.text,
        };
    }
    //
    static async toDomain(comment) {
        const commentOrError = comment_1.Comment.create({
            text: comment.text,
        }, new UniqueEntityID_1.UniqueEntityID(comment.Id));
        commentOrError.isFailure ? console.log(commentOrError.error) : '';
        return commentOrError.isSuccess ? commentOrError.getValue() : null;
    }
    static toPersistence(comment) {
        return {
            Id: comment.id.toString(),
            text: comment.text
        };
    }
}
exports.CommentMap = CommentMap;
//# sourceMappingURL=CommentMap.js.map