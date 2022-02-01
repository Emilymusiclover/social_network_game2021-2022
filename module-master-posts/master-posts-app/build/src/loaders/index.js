"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    const feedSchema = {
        // compare with the approach followed in repos and services
        name: 'feedSchema',
        schema: '../persistence/schemas/feedSchema',
    };
    const feedController = {
        name: config_1.default.controllers.feed.name,
        path: config_1.default.controllers.feed.path
    };
    const feedRepo = {
        name: config_1.default.repos.feed.name,
        path: config_1.default.repos.feed.path
    };
    const feedService = {
        name: config_1.default.services.feed.name,
        path: config_1.default.services.feed.path
    };
    const postSchema = {
        // compare with the approach followed in repos and services
        name: 'postSchema',
        schema: '../persistence/schemas/postSchema',
    };
    const postController = {
        name: config_1.default.controllers.post.name,
        path: config_1.default.controllers.post.path
    };
    const postRepo = {
        name: config_1.default.repos.post.name,
        path: config_1.default.repos.post.path
    };
    const postService = {
        name: config_1.default.services.post.name,
        path: config_1.default.services.post.path
    };
    const commentSchema = {
        // compare with the approach followed in repos and services
        name: 'commentSchema',
        schema: '../persistence/schemas/commentSchema',
    };
    const commentController = {
        name: config_1.default.controllers.comment.name,
        path: config_1.default.controllers.comment.path
    };
    const commentRepo = {
        name: config_1.default.repos.comment.name,
        path: config_1.default.repos.comment.path
    };
    const commentService = {
        name: config_1.default.services.comment.name,
        path: config_1.default.services.comment.path
    };
    const reactionsSchema = {
        // compare with the approach followed in repos and services
        name: 'reactionsSchema',
        schema: '../persistence/schemas/reactionsSchema',
    };
    const reactionsController = {
        name: config_1.default.controllers.reactions.name,
        path: config_1.default.controllers.reactions.path
    };
    const reactionsRepo = {
        name: config_1.default.repos.reactions.name,
        path: config_1.default.repos.reactions.path
    };
    const reactionsService = {
        name: config_1.default.services.reactions.name,
        path: config_1.default.services.reactions.path
    };
    const userReactionSchema = {
        // compare with the approach followed in repos and services
        name: 'userReactionSchema',
        schema: '../persistence/schemas/userReactionSchema',
    };
    const userReactionController = {
        name: config_1.default.controllers.userReaction.name,
        path: config_1.default.controllers.userReaction.path
    };
    const userReactionRepo = {
        name: config_1.default.repos.userReaction.name,
        path: config_1.default.repos.userReaction.path
    };
    const userReactionService = {
        name: config_1.default.services.userReaction.name,
        path: config_1.default.services.userReaction.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            feedSchema,
            postSchema,
            commentSchema,
            reactionsSchema,
            userReactionSchema
        ],
        controllers: [
            feedController,
            postController,
            commentController,
            reactionsController,
            userReactionController
        ],
        repos: [
            feedRepo,
            postRepo,
            commentRepo,
            reactionsRepo,
            userReactionRepo
        ],
        services: [
            feedService,
            postService,
            commentService,
            reactionsService,
            userReactionService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map