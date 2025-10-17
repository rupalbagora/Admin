"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const youtubeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    // Either a YouTube URL or a local file path
    videoUrl: { type: String }, // For YouTube links
    videoPath: { type: String }, // For uploaded files
    uploadedAt: { type: Date, default: Date.now },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("YoutubeVideo", youtubeSchema);
