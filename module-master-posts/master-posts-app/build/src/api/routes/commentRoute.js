"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate"); // Validation
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/comments", route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.comment.name);
    // Post request /api/posts
    // Joi validation request text is required
    route.post("", (req, res, next) => ctrl.createComment(req, res, next));
    // Get request /api/posts
    // Joi validation request text is required
    // route.get("", (req, res, next) => ctrl.getAllPosts(req, res, next));
    // Get request /api/posts/id
    route.get("/:id", (req, res, next) => ctrl.getComment(req, res, next));
    // Delete request /api/posts/id
    route.delete("/:id", (req, res, next) => ctrl.removeComment(req, res, next));
    // Update post
    route.put("/:id", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            text: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.updateComment(req, res, next));
};
//# sourceMappingURL=commentRoute.js.map