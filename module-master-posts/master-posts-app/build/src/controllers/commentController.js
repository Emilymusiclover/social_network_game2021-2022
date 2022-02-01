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
let CommentController = class CommentController {
    constructor(commentServiceInstance //Service injection
    ) {
        this.commentServiceInstance = commentServiceInstance;
    }
    async createComment(req, res, next) {
        try {
            const commentOrError = (await this.commentServiceInstance.createComment(req.body));
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
    async getComment(req, res, next) {
        try {
            const commentOrError = (await this.commentServiceInstance.getComment(req.params.id));
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
    async removeComment(req, res, next) {
        try {
            const commentOrError = (await this.commentServiceInstance.removeComment(req.params.id));
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
    async updateComment(req, res, next) {
        try {
            const commentOrError = (await this.commentServiceInstance.updateComment(req.body));
            if (commentOrError.isFailure) {
                return res.status(404).send();
            }
            const commentDTO = commentOrError.getValue();
            return res.status(201).json(commentDTO);
        }
        catch (e) {
            return next(e);
        }
    }
};
CommentController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.comment.name)),
    __metadata("design:paramtypes", [Object])
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=commentController.js.map