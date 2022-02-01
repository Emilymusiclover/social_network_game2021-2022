"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const feedSchema = new mongoose_1.default.Schema({
    Id: { type: String, unique: true },
    userId: { type: String, unique: true },
    posts: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post", default: [] }],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Feed", feedSchema);
//# sourceMappingURL=feedSchema.js.map