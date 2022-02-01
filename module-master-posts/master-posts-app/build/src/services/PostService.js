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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi"); //Dependency injection
const config_1 = __importDefault(require("../../config")); //Env config variables
const post_1 = require("../domain/post");
const comment_1 = require("../domain/comment");
const Result_1 = require("../core/logic/Result"); //??
const PostMap_1 = require("../mappers/PostMap"); // Post Mapper
const CommentMap_1 = require("../mappers/CommentMap");
let PostService = class PostService {
    constructor(postRepo, commentRepo) {
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
    }
    async getPost(postId) {
        try {
            const post = await this.postRepo.findByDomainId(postId);
            if (post === null) {
                return Result_1.Result.fail("Post not found");
            }
            else {
                const postDTOResult = PostMap_1.PostMap.toDTO(post);
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllPosts() {
        try {
            const postsArray = await this.postRepo.getAll();
            if (postsArray === null) {
                return Result_1.Result.fail("Posts not found");
            }
            else {
                const postDTOResult = [];
                postsArray.forEach((post) => {
                    const postAdd = PostMap_1.PostMap.toDTO(post);
                    postDTOResult.push(postAdd);
                });
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createPost(postDTO) {
        try {
            const postOrError = await post_1.Post.create(postDTO);
            // var arrayLikes: Likes[] = [];
            // var newLike: Likes;
            // newLike.count = 0;
            // arrayLikes.push(newLike);
            // var arrayDisLikes: Dislikes[] = [];
            // var newDislike: Dislikes;
            // newDislike.count = 0;
            // arrayDisLikes.push(newDislike);
            // const createReactions = await Reactions.create({
            //   valuesLikes: arrayLikes,
            //   valuesDislike: arrayDisLikes,
            // });
            if (postOrError.isFailure) {
                return Result_1.Result.fail(postOrError.errorValue());
            }
            // if (createReactions.isFailure) {
            //   return Result.fail<IPostDTO>(postOrError.errorValue());
            // }
            const postResult = postOrError.getValue();
            // postResult.reactions=createReactions.getValue();
            await this.postRepo.save(postResult);
            const postDTOResult = PostMap_1.PostMap.toDTO(postResult);
            return Result_1.Result.ok(postDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async removePost(postId) {
        try {
            const post = await this.postRepo.remove(postId);
            if (post === null) {
                return Result_1.Result.fail("Post not found");
            }
            else {
                const postDTOResult = PostMap_1.PostMap.toDTO(post);
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async updatePost(postDTO) {
        try {
            const post = await this.postRepo.findByDomainId(postDTO.Id);
            if (post === null) {
                return Result_1.Result.fail("Post not found");
            }
            else {
                post.text = postDTO.text;
                await this.postRepo.save(post);
                const postDTOResult = PostMap_1.PostMap.toDTO(post);
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createCommentPost(postID, commentDTO) {
        try {
            const commentOrError = await comment_1.Comment.create(commentDTO);
            if (commentOrError.isFailure) {
                return Result_1.Result.fail(commentOrError.errorValue());
            }
            const commentResult = commentOrError.getValue();
            await this.commentRepo.savePost(postID, commentResult);
            const commentDTOResult = CommentMap_1.CommentMap.toDTO(commentResult);
            return Result_1.Result.ok(commentDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
PostService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.post.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.comment.name)),
    __metadata("design:paramtypes", [Object, Object])
], PostService);
exports.default = PostService;
//# sourceMappingURL=PostService.js.map