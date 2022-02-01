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
const userReaction_1 = require("../domain/userReaction");
const Result_1 = require("../core/logic/Result"); //??
const UserReactionMap_1 = require("../mappers/UserReactionMap");
let UserReactionService = class UserReactionService {
    constructor(reactionRepo) {
        this.reactionRepo = reactionRepo;
    }
    async getReaction(reactionId) {
        try {
            const reaction = await this.reactionRepo.findByDomainId(reactionId);
            if (reaction === null) {
                return Result_1.Result.fail("Comment not found");
            }
            else {
                const reactionDTOResult = UserReactionMap_1.UserReactionMap.toDTO(reaction);
                return Result_1.Result.ok(reactionDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createReaction(reactionDTO) {
        try {
            const reactionOrError = await userReaction_1.userReaction.create(reactionDTO);
            if (reactionOrError.isFailure) {
                return Result_1.Result.fail(reactionOrError.errorValue());
            }
            const reactionResult = reactionOrError.getValue();
            await this.reactionRepo.save(reactionResult);
            const reactionDTOResult = UserReactionMap_1.UserReactionMap.toDTO(reactionResult);
            return Result_1.Result.ok(reactionDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
UserReactionService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.userReaction.name)),
    __metadata("design:paramtypes", [Object])
], UserReactionService);
exports.default = UserReactionService;
//# sourceMappingURL=UserReactionService.js.map