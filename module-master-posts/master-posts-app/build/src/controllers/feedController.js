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
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
let FeedController = class FeedController {
    constructor(feedServiceInstance) {
        this.feedServiceInstance = feedServiceInstance;
    }
    async validateUser(req, res, next) {
        let feed = req.body;
        let id = feed.userId;
        if (!id)
            id = req.params.id;
        let url = `${config_1.default.masterDataURL}/api/users/${id}`;
        const instance = axios_1.default.create({
            httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
        });
        instance
            .get(url)
            .then((res) => next())
            .catch((err) => {
            if (!err.response) {
                error("master data did not respond");
            }
            else if (err.response.status === 400) {
                error("master data user not found");
            }
            else {
                error(`master data invalid response status : ${err.response.status}`);
            }
        });
        const error = (message) => {
            res.status(500);
            res.send({ error: message });
        };
    }
    async createFeed(req, res, next) {
        try {
            let createFeedDto = req.body;
            let result = await this.feedServiceInstance.createFeed(createFeedDto);
            if (result.isFailure) {
                return res
                    .status(400)
                    .send({ controller_error: result.errorValue() })
                    .end();
            }
            let feedDto = result.getValue();
            return res.status(201).json(feedDto);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllFeeds(req, res, next) {
        try {
            let result = await this.feedServiceInstance.getAllFeeds();
            if (result.isFailure) {
                return res
                    .status(400)
                    .send({ controller_error: result.errorValue() })
                    .end();
            }
            const feedsDto = result.getValue();
            return res.status(200).json(feedsDto);
        }
        catch (error) {
            next(error);
        }
    }
    async getFeed(req, res, next) {
        try {
            let result = await this.feedServiceInstance.getFeed(req.params.id);
            if (result.isFailure) {
                return res
                    .status(400)
                    .send({ controller_error: result.errorValue() })
                    .end();
            }
            let feedDto = result.getValue();
            return res.status(200).json(feedDto);
        }
        catch (error) {
            next(error);
        }
    }
    async getFeedByUser(req, res, next) {
        try {
            let result = await this.feedServiceInstance.getFeedByUser(req.params.id);
            if (result.isFailure) {
                return res
                    .status(400)
                    .send({ controller_error: result.errorValue() })
                    .end();
            }
            let feedDto = result.getValue();
            return res.status(200).json(feedDto);
        }
        catch (error) {
            next(error);
        }
    }
    async removeFeed(req, res, next) {
        try {
            let result = await this.feedServiceInstance.removeFeed(req.params.id);
            if (result.isFailure) {
                return res
                    .status(400)
                    .send({ controller_error: result.errorValue() })
                    .end();
            }
            let feedDto = result.getValue();
            return res.status(200).json(feedDto);
        }
        catch (error) {
            next(error);
        }
    }
    updateFeed(req, res, next) {
        throw new Error("Method not implemented.");
    }
};
FeedController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.feed.name)),
    __metadata("design:paramtypes", [Object])
], FeedController);
exports.default = FeedController;
//# sourceMappingURL=feedController.js.map