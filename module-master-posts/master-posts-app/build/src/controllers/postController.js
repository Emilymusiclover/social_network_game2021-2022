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
const typedi_1 = require("typedi"); //TypeScript Dependecy injection
const config_1 = __importDefault(require("../../config"));
const CommentMap_1 = require("../mappers/CommentMap");
let PostController = class PostController {
    constructor(postServiceInstance, //Service injection
    feedServiceInstance, commentServiceInstance) {
        this.postServiceInstance = postServiceInstance;
        this.feedServiceInstance = feedServiceInstance;
        this.commentServiceInstance = commentServiceInstance;
    }
    async createPost(req, res, next) {
        try {
            const userId = req.params.id;
            const feedOrError = await this.feedServiceInstance.getFeedByUser(userId);
            if (feedOrError.isFailure) {
                const feed = { userId: userId };
                const createFeed = await this.feedServiceInstance.createFeed(feed);
                if (createFeed.isFailure) {
                    return res.status(402).send();
                }
                const text = req.body;
                const textValue = text.text;
                const createPost = {
                    feedId: createFeed.getValue().Id.toString(),
                    text: textValue,
                };
                const post = (await this.postServiceInstance.createPost(createPost));
                //Failure
                if (post.isFailure) {
                    return res.status(402).send();
                }
                //Created
                const postDTO = post.getValue();
                return res.json(postDTO).status(201);
            }
            else {
                const text = req.body;
                const textValue = text.text;
                const createPostExists = {
                    feedId: feedOrError.getValue().Id.toString(),
                    text: textValue,
                };
                const postOrError = (await this.postServiceInstance.createPost(createPostExists));
                //Failure
                if (postOrError.isFailure) {
                    return res.status(402).send();
                }
                //Created
                const postDTO = postOrError.getValue();
                return res.json(postDTO).status(201);
            }
        }
        catch (e) {
            return next(e);
        }
    }
    async getPost(req, res, next) {
        try {
            const postOrError = (await this.postServiceInstance.getPost(req.params.id));
            //Failure
            if (postOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getAllPosts(req, res, next) {
        try {
            const postsOrError = (await this.postServiceInstance.getAllPosts());
            //Failure
            if (postsOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const postsDTO = postsOrError.getValue();
            return res.json(postsDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async removePost(req, res, next) {
        try {
            const postOrError = (await this.postServiceInstance.removePost(req.params.id));
            //Failure
            if (postOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async updatePost(req, res, next) {
        try {
            const postOrError = (await this.postServiceInstance.updatePost(req.body));
            if (postOrError.isFailure) {
                return res.status(404).send();
            }
            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    async createCommentPost(req, res, next) {
        try {
            const commentOrError = (await this.postServiceInstance.createCommentPost(req.params.id, req.body));
            //Failure
            if (commentOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const commentDTO = commentOrError.getValue();
            return res.json(commentDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    async getCommentsPost(req, res, next) {
        try {
            const postOrError = (await this.postServiceInstance.getPost(req.params.id));
            //Failure
            if (postOrError.isFailure) {
                return res.status(402).send();
            }
            //Created
            const post = postOrError.getValue();
            const comments = await post.comments;
            const commentsDTOArray = [];
            comments.forEach(async (c) => {
                let add = (await CommentMap_1.CommentMap.toDTO(c));
                commentsDTOArray.push(add);
            });
            return res.json(commentsDTOArray).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
};
PostController = __decorate([
    (0, typedi_1.Service)() /* TODO: extends ../core/infra/BaseController */,
    __param(0, (0, typedi_1.Inject)(config_1.default.services.post.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.services.feed.name)),
    __param(2, (0, typedi_1.Inject)(config_1.default.services.comment.name)),
    __metadata("design:paramtypes", [Object, Object, Object])
], PostController);
exports.default = PostController;
//# sourceMappingURL=postController.js.map