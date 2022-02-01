"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10) || 3333,
    /**
     * MongoDB Database URL
     */
    databaseURL: process.env.MONGODB_URI ||
        "mongodb+srv://lapr5_g08:ccej2021@cluster0.uvtlg.mongodb.net/Cluster0?retryWrites=true&w=majority",
    /**
     * Master Data Application Https URL (dotnet app)
     */
    masterDataURL: "https://localhost:5001",
    /**
     * Used by winston logger ?
     */
    logs: {
        level: process.env.LOG_LEVEL || "info",
    },
    /**
     * API configs
     */
    api: {
        prefix: "/api",
    },
    controllers: {
        feed: {
            name: "FeedController",
            path: "../controllers/feedController",
        },
        post: {
            name: "PostController",
            path: "../controllers/postController",
        },
        comment: {
            name: "CommentController",
            path: "../controllers/commentController",
        },
        reactions: {
            name: "ReactionsController",
            path: "../controllers/reactionsController",
        },
        userReaction: {
            name: "UserReactionController",
            path: "../controllers/userReactionController",
        },
    },
    repos: {
        feed: {
            name: "FeedRepo",
            path: "../repositories/feedRepo",
        },
        post: {
            name: "PostRepo",
            path: "../repositories/postRepo",
        },
        comment: {
            name: "CommentRepo",
            path: "../repositories/commentRepo",
        },
        reactions: {
            name: "ReactionsRepo",
            path: "../repositories/reactionsRepo",
        },
        userReaction: {
            name: "UserReactionRepo",
            path: "../repositories/userReactionRepo",
        },
    },
    services: {
        feed: {
            name: "FeedService",
            path: "../services/FeedService",
        },
        post: {
            name: "PostService",
            path: "../services/PostService",
        },
        comment: {
            name: "CommentService",
            path: "../services/CommentService",
        },
        reactions: {
            name: "ReactionsService",
            path: "../services/ReactionsService",
        },
        userReaction: {
            name: "UserReactionService",
            path: "../services/UserReactionService",
        },
    },
};
//# sourceMappingURL=config.js.map