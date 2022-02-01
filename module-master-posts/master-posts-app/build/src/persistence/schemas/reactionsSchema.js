"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reactionsSchema = new mongoose_1.default.Schema({
    Id: { type: String, unique: true },
    valuesLikes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserReaction', unique: false }],
    valuesDislikes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserReaction', unique: false }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Reactions', reactionsSchema);
//# sourceMappingURL=reactionsSchema.js.map