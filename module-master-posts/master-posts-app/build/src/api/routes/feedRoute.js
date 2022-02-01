"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/feeds", route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.feed.name);
    // Post request /api/feeds
    route.post("", (req, res, next) => ctrl.validateUser(req, res, next), (req, res, next) => ctrl.createFeed(req, res, next));
    // Get Request /api/feeds
    route.get("", (req, res, next) => ctrl.getAllFeeds(req, res, next));
    // Get request /api/feeds/id
    route.get("/:id", (req, res, next) => ctrl.getFeed(req, res, next));
    // Get request /api/feeds/byUserId/id
    route.get("/userId/:id", (req, res, next) => ctrl.validateUser(req, res, next), (req, res, next) => ctrl.getFeedByUser(req, res, next));
    // Delete request /api/feeds/id
    route.delete("/:id", (req, res, next) => ctrl.removeFeed(req, res, next));
    // Update request /api/feeds/id
    route.put("/:id", (req, res, next) => ctrl.validateUser(req, res, next), (req, res, next) => ctrl.updateFeed(req, res, next));
    // celebrate({
    //   body: Joi.object({
    //     id: Joi.string().required(),
    //     text: Joi.string().required(),
    //   }),
    // }),
};
//# sourceMappingURL=feedRoute.js.map