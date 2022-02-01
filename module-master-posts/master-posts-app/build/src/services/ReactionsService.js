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
const reactions_1 = require("../domain/reactions");
const Result_1 = require("../core/logic/Result"); //??
const ReactionsMap_1 = require("../mappers/ReactionsMap");
let ReactionsService = class ReactionsService {
    constructor(postRepo, //Repo injection
    reactionsRepo) {
        this.postRepo = postRepo;
        this.reactionsRepo = reactionsRepo;
    }
    /* createReactions(reactionsDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>; //Comment request method create a new post
   
    updateReactionPost(reactionDTO: IReactionsDTO): Promise<Result<IReactionsDTO>>;
   
    getReactionPost(postId: string): Promise<Result<IReactionsDTO>>;//Get request method */
    async getReaction(reactionsId) {
        try {
            const reactions = await this.reactionsRepo.findByDomainId(reactionsId);
            if (reactions === null) {
                return Result_1.Result.fail("Comment not found");
            }
            else {
                const reactionsDTOResult = ReactionsMap_1.ReactionsMap.toDTO(reactions);
                return Result_1.Result.ok(reactionsDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createReactionsPost(postId, reactionsDTO) {
        try {
            const reactionsOrError = await reactions_1.Reactions.create(reactionsDTO);
            if (reactionsOrError.isFailure) {
                return Result_1.Result.fail(reactionsOrError.errorValue());
            }
            const reactionsResult = reactionsOrError.getValue();
            await this.reactionsRepo.savePost(postId, reactionsResult);
            const reactionsDTOResult = ReactionsMap_1.ReactionsMap.toDTO(reactionsResult);
            return Result_1.Result.ok(reactionsDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
ReactionsService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.post.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.reactions.name)),
    __metadata("design:paramtypes", [Object, Object])
], ReactionsService);
exports.default = ReactionsService;
//# sourceMappingURL=ReactionsService.js.map