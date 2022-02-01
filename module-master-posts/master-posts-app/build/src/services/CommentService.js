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
const comment_1 = require("../domain/comment");
const Result_1 = require("../core/logic/Result"); //??
const CommentMap_1 = require("../mappers/CommentMap");
let CommentService = class CommentService {
    constructor(postRepo, //Repo injection
    commentRepo) {
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
    }
    async getComment(commentId) {
        try {
            const comment = await this.commentRepo.findByDomainId(commentId);
            if (comment === null) {
                return Result_1.Result.fail("Comment not found");
            }
            else {
                const commentDTOResult = CommentMap_1.CommentMap.toDTO(comment);
                return Result_1.Result.ok(commentDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createComment(commentDTO) {
        try {
            const commentOrError = await comment_1.Comment.create(commentDTO);
            if (commentOrError.isFailure) {
                return Result_1.Result.fail(commentOrError.errorValue());
            }
            const commentResult = commentOrError.getValue();
            await this.commentRepo.save(commentResult);
            const commentDTOResult = CommentMap_1.CommentMap.toDTO(commentResult);
            return Result_1.Result.ok(commentDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async removeComment(commentId) {
        try {
            const comment = await this.commentRepo.remove(commentId);
            if (comment === null) {
                return Result_1.Result.fail("Comment not found");
            }
            else {
                const commentDTOResult = CommentMap_1.CommentMap.toDTO(comment);
                return Result_1.Result.ok(commentDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async updateComment(commentDTO) {
        try {
            const comment = await this.commentRepo.findByDomainId(commentDTO.id);
            if (comment === null) {
                return Result_1.Result.fail("Comment not found");
            }
            else {
                comment.text = commentDTO.text;
                await this.commentRepo.save(comment);
                const commentDTOResult = CommentMap_1.CommentMap.toDTO(comment);
                return Result_1.Result.ok(commentDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
CommentService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.post.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.comment.name)),
    __metadata("design:paramtypes", [Object, Object])
], CommentService);
exports.default = CommentService;
//# sourceMappingURL=CommentService.js.map