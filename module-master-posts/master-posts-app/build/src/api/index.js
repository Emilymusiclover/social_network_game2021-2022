"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedRoute_1 = __importDefault(require("./routes/feedRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const reactionsRoute_1 = __importDefault(require("./routes/reactionsRoute"));
const userReactionRoute_1 = __importDefault(require("./routes/userReactionRoute"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.get("/", (req, res) => res.send("<h1>Master Data Api</h1>"));
    (0, feedRoute_1.default)(app);
    (0, postRoute_1.default)(app);
    (0, commentRoute_1.default)(app);
    (0, reactionsRoute_1.default)(app);
    (0, userReactionRoute_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map