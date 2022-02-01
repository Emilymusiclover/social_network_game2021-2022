"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    Id: { type: String, unique: true },
    text: { type: String, unique: false }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Comment', commentSchema);
//# sourceMappingURL=commentSchema.js.map