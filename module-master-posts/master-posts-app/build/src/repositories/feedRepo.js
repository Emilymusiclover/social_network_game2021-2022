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
const mongoose_1 = require("mongoose");
const FeedMap_1 = require("../mappers/FeedMap");
let FeedRepo = class FeedRepo {
    constructor(feedSchema // @Inject("postSchema") // private postSchema: Model<IPostPersistence & Document>
    ) {
        this.feedSchema = feedSchema;
    }
    async exists(feed) {
        const query = { Id: feed.id.toString() };
        const doc = await this.feedSchema.findOne(query);
        return doc !== null;
    }
    async save(feed) {
        // check if object exits
        if (await this.exists(feed))
            return null;
        // create new object
        const rawFeed = FeedMap_1.FeedMap.toPersistence(feed);
        const newFeed = await this.feedSchema.create(rawFeed);
        return FeedMap_1.FeedMap.toDomain(newFeed);
    }
    async getAll() {
        const records = await this.feedSchema
            .find({})
            .populate("posts", "-_id -__v");
        // console.log(`FeedRepo : records = ${JSON.stringify(records)}`);
        const feeds = [];
        if (records == null)
            return null;
        records.forEach(async (feed) => {
            let domainFeed = await FeedMap_1.FeedMap.toDomain(feed);
            feeds.push(domainFeed);
        });
        return feeds;
    }
    async findByDomainId(feedId) {
        const query = { Id: feedId };
        const doc = await this.feedSchema
            .findOne(query)
            .populate("posts", "-_id -__v");
        return doc === null ? null : FeedMap_1.FeedMap.toDomain(doc);
    }
    async findByUserId(userId) {
        const query = { userId: userId };
        const doc = await this.feedSchema
            .findOne(query)
            .populate("posts", "-_id -__v");
        return doc === null ? null : FeedMap_1.FeedMap.toDomain(doc);
    }
    async remove(feedId) {
        const query = { Id: feedId };
        const doc = await this.feedSchema
            .findOneAndDelete(query)
            .populate("posts", "-_id -__v");
        return doc === null ? null : FeedMap_1.FeedMap.toDomain(doc);
    }
};
FeedRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("feedSchema")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FeedRepo);
exports.default = FeedRepo;
//# sourceMappingURL=feedRepo.js.map