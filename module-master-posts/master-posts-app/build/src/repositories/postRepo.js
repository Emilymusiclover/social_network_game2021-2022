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
const postId_1 = require("../domain/postId");
const PostMap_1 = require("../mappers/PostMap");
const mongoose_1 = require("mongoose");
let PostRepo = class PostRepo {
    constructor(postSchema, commentSchema, feedSchema) {
        this.postSchema = postSchema;
        this.commentSchema = commentSchema;
        this.feedSchema = feedSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(post) {
        const idX = post.id instanceof postId_1.PostId ? post.id.toValue() : post.id;
        const query = { Id: idX };
        const postDocument = await this.postSchema.findOne(query);
        return !!postDocument === true;
    }
    async save(post) {
        const query = { Id: post.id.toString() };
        const queryFeed = { feedId: post.feedId.toString() };
        const feedDoc = await this.feedSchema.findOne(queryFeed);
        const postDocument = await this.postSchema.findOne(query);
        try {
            if (postDocument === null) {
                const rawPost = PostMap_1.PostMap.toPersistence(post);
                const postCreated = await this.postSchema.create(rawPost);
                const feedRecord = await this.feedSchema.findOneAndUpdate(queryFeed, {
                    $push: { posts: postCreated._id },
                });
                if (feedRecord === null) {
                    return null;
                }
                return PostMap_1.PostMap.toDomain(postCreated);
            }
            else {
                postDocument.text = post.text;
                await postDocument.save();
                return post;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async remove(postId) {
        const query = { Id: postId };
        const postRecord = await this.postSchema.findOneAndRemove(query);
        if (postRecord != null) {
            return PostMap_1.PostMap.toDomain(postRecord);
        }
        else
            return null;
    }
    async findByDomainId(postId) {
        const query = { Id: postId };
        const postRecord = await this.postSchema
            .findOne(query)
            .populate("comments", "-_id -__v");
        if (postRecord != null) {
            return PostMap_1.PostMap.toDomain(postRecord);
        }
        else
            return null;
    }
    async getAll() {
        const postRecord = await this.postSchema
            .find({})
            .populate("comments", "-_id -__v");
        const postArray = [];
        if (postRecord != null) {
            postRecord.forEach(async (post) => {
                let postAdd = await PostMap_1.PostMap.toDomain(post);
                postArray.push(postAdd);
            });
            // console.log(postRecord);
            return postArray;
        }
        else
            return null;
    }
};
PostRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("postSchema")),
    __param(1, (0, typedi_1.Inject)("commentSchema")),
    __param(2, (0, typedi_1.Inject)("feedSchema")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PostRepo);
exports.default = PostRepo;
//# sourceMappingURL=postRepo.js.map