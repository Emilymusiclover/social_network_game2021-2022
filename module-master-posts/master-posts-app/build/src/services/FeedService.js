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
const config_1 = __importDefault(require("../../config"));
const typedi_1 = require("typedi");
const Result_1 = require("../core/logic/Result");
const feed_1 = require("../domain/feed");
const FeedMap_1 = require("../mappers/FeedMap");
let FeedService = class FeedService {
    constructor(feedRepo) {
        this.feedRepo = feedRepo;
    }
    async createFeed(feedDto) {
        try {
            let createFeed = feed_1.Feed.create(feedDto);
            if (createFeed.isFailure) {
                return Result_1.Result.fail(createFeed.errorValue());
            }
            else {
                let feed = createFeed.getValue();
                await this.feedRepo.save(feed);
                const savedDto = FeedMap_1.FeedMap.toDTO(feed);
                return Result_1.Result.ok(savedDto);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getFeed(feedId) {
        try {
            const feed = await this.feedRepo.findByDomainId(feedId);
            if (feed === null) {
                return Result_1.Result.fail("Feed not found");
            }
            const feedDto = FeedMap_1.FeedMap.toDTO(feed);
            return Result_1.Result.ok(feedDto);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllFeeds() {
        try {
            const feeds = await this.feedRepo.getAll();
            if (feeds === null) {
                return Result_1.Result.fail("Feeds not found");
            }
            // console.log(`FeedService : feeds = ${JSON.stringify(feeds)}`);
            const dtos = [];
            feeds.forEach((feed) => {
                const feedDto = FeedMap_1.FeedMap.toDTO(feed);
                dtos.push(feedDto);
            });
            return Result_1.Result.ok(dtos);
        }
        catch (error) {
            throw error;
        }
    }
    async getFeedByUser(userId) {
        try {
            const feed = await this.feedRepo.findByUserId(userId);
            if (feed === null) {
                return Result_1.Result.fail("Feed not found");
            }
            const feedDto = FeedMap_1.FeedMap.toDTO(feed);
            return Result_1.Result.ok(feedDto);
        }
        catch (error) {
            throw error;
        }
    }
    async removeFeed(feedId) {
        try {
            const feed = await this.feedRepo.remove(feedId);
            if (feed === null) {
                return Result_1.Result.fail("Feed not found");
            }
            const feedDto = FeedMap_1.FeedMap.toDTO(feed);
            return Result_1.Result.ok(feedDto);
        }
        catch (error) {
            throw error;
        }
    }
    async updateFeed(feedDto) {
        // should only allow to update posts[]
        throw new Error("Method not implemented.");
    }
};
FeedService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.feed.name)),
    __metadata("design:paramtypes", [Object])
], FeedService);
exports.default = FeedService;
//# sourceMappingURL=FeedService.js.map