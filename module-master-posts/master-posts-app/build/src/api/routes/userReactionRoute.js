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
    app.use("/userreactions", route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.userReaction.name);
    route.get("/:id", (req, res, next) => ctrl.getReaction(req, res, next));
    route.post("", (req, res, next) => ctrl.createReaction(req, res, next));
};
//# sourceMappingURL=userReactionRoute.js.map