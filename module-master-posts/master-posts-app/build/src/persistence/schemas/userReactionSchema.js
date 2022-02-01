"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userReactionSchema = new mongoose_1.default.Schema({
    Id: { type: String, unique: true },
    value: { type: String, unique: false }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('UserReaction', userReactionSchema);
//# sourceMappingURL=userReactionSchema.js.map