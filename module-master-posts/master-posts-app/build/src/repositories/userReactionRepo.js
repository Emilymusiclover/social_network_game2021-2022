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
const userReactionId_1 = require("../domain/userReactionId");
const UserReactionMap_1 = require("../mappers/UserReactionMap");
const mongoose_1 = require("mongoose");
let UserReactionRepo = class UserReactionRepo {
    constructor(reactionSchema) {
        this.reactionSchema = reactionSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(reaction) {
        const idX = reaction.id instanceof userReactionId_1.userReactionId ? reaction.id.toValue() : reaction.id;
        const query = { Id: idX };
        const reactionDocument = await this.reactionSchema.findOne(query);
        return !!reactionDocument === true;
    }
    async save(reaction) {
        const query = { Id: reaction.id.toString() };
        const reactionDocument = await this.reactionSchema.findOne(query);
        try {
            if (reactionDocument === null) {
                const rawReaction = UserReactionMap_1.UserReactionMap.toPersistence(reaction);
                const reactionCreated = await this.reactionSchema.create(rawReaction);
                return UserReactionMap_1.UserReactionMap.toDomain(reactionCreated);
            }
            else {
                await reactionDocument.save();
                return reaction;
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
    async findByDomainId(reactionId) {
        const query = { Id: reactionId };
        const reactionRecord = await this.reactionSchema.findOne(query);
        if (reactionRecord != null) {
            return UserReactionMap_1.UserReactionMap.toDomain(reactionRecord);
        }
        else
            return null;
    }
};
UserReactionRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('userReactionSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserReactionRepo);
exports.default = UserReactionRepo;
//# sourceMappingURL=userReactionRepo.js.map