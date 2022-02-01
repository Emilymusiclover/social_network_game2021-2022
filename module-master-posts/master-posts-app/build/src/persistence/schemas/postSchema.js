"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    feedId: { type: String, unique: false },
    Id: { type: String, unique: true },
    text: { type: String, unique: false },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment", default: [] }],
    //reactions:{type:mongoose.Schema.Types.ObjectId, ref:"Reactions"},
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=postSchema.js.map