"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const reactionsId_1 = require("../domain/reactionsId");
const ReactionsMap_1 = require("../mappers/ReactionsMap");
const mongoose_1 = require("mongoose");
let ReactionsRepo = class ReactionsRepo {
    constructor(reactionsSchema, postSchema) {
        this.reactionsSchema = reactionsSchema;
        this.postSchema = postSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(reactions) {
        const idX = reactions.id instanceof reactionsId_1.ReactionsId ? reactions.id.toValue() : reactions.id;
        const query = { Id: idX };
        const reactionsDocument = await this.reactionsSchema.findOne(query);
        return !!reactionsDocument === true;
    }
    async save(reactions) {
        const query = { Id: reactions.id.toString() };
        const reactionsDocument = await this.reactionsSchema.findOne(query);
        try {
            if (reactionsDocument === null) {
                const rawReactions = ReactionsMap_1.ReactionsMap.toPersistence(reactions);
                const reactionsCreated = await this.reactionsSchema.create(rawReactions);
                return ReactionsMap_1.ReactionsMap.toDomain(reactionsCreated);
            }
            else {
                await reactionsDocument.save();
                return reactions;
            }
        }
        catch (err) {
            throw err;
        }
    }
    /**public async remove (commentId:CommentId | string): Promise<Comment> {
      const query = { Id: commentId};
      const commentRecord = await this.commentSchema.findOneAndRemove( query as FilterQuery<ICommentPersistence & Document> );
      
      if( commentRecord != null) {
        
        return CommentMap.toDomain(commentRecord);
  
      }
      else
        return null;
    }
  */
    async findByDomainId(reactionsId) {
        const query = { Id: reactionsId };
        const reactionsRecord = await this.reactionsSchema.findOne(query);
        if (reactionsRecord != null) {
            return ReactionsMap_1.ReactionsMap.toDomain(reactionsRecord);
        }
        else
            return null;
    }
    async savePost(postId, reactions) {
        const query = { Id: reactions.id.toString() };
        const reactionsDocument = await this.reactionsSchema.findOne(query);
        try {
            if (reactionsDocument === null) {
                const rawReactions = ReactionsMap_1.ReactionsMap.toPersistence(reactions);
                const reactionsCreated = await this.reactionsSchema.create(rawReactions);
                const postQuery = { Id: postId };
                const postRecord = await this.postSchema.findOneAndUpdate(postQuery, { $push: { reactions: reactionsCreated._id } });
                return ReactionsMap_1.ReactionsMap.toDomain(reactionsCreated);
            }
            else {
                await reactionsDocument.save();
                return reactions;
            }
        }
        catch (err) {
            throw err;
        }
    }
};
ReactionsRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('reactionsSchema')),
    __param(1, (0, typedi_1.Inject)('postSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], ReactionsRepo);
exports.default = ReactionsRepo;
//# sourceMappingURL=reactionsRepo.js.map