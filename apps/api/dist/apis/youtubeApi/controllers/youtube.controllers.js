"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteYoutubeVideo = exports.updateYoutubeVideo = exports.getYoutubeVideosByDate = exports.getYoutubeVideoById = exports.getAllYoutubeVideos = exports.createYoutubeVideo = void 0;
const youtube_services_1 = __importDefault(require("../services/youtube.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Create a new YouTube video entry
 * Supports both video file uploads and YouTube URLs
 */
const createYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedBy = req.user._id;
        const { title, videoUrl } = req.body;
        const videoPath = req.file
            ? `/uploads/videos/${req.file.filename}`
            : undefined;
        if (!videoUrl && !req.file) {
            return res
                .status(400)
                .json({
                success: false,
                error: "You must provide a video file or a YouTube URL.",
            });
        }
        const newVideo = yield youtube_services_1.default.create({
            title,
            videoUrl: videoUrl || undefined,
            videoPath,
            addedBy,
        });
        res.status(201).json({ success: true, data: newVideo });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createYoutubeVideo = createYoutubeVideo;
/**
 * Get all YouTube videos
 */
const getAllYoutubeVideos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield youtube_services_1.default.getAll();
        res.status(200).json({ success: true, data: videos });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllYoutubeVideos = getAllYoutubeVideos;
/**
 * Get a single video by ID
 */
const getYoutubeVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield youtube_services_1.default.getById(req.params.id);
        if (!video) {
            return res
                .status(404)
                .json({ success: false, message: "Video not found" });
        }
        res.status(200).json({ success: true, data: video });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getYoutubeVideoById = getYoutubeVideoById;
/**
 * Get videos by a specific date
 */
const getYoutubeVideosByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield youtube_services_1.default.getByDate(req.params.date);
        res.status(200).json({ success: true, data: videos });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getYoutubeVideosByDate = getYoutubeVideosByDate;
/**
 * Update an existing video
 * Allows updating title, YouTube URL, or replacing the uploaded video file
 */
const updateYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("heyyyyllo");
    try {
        console.log("heyyyyyyyyyy");
        const { title, videoUrl } = req.body;
        console.log("title", title);
        const videoPath = req.file
            ? `/uploads/videos/${req.file.filename}`
            : undefined;
        // ✅ Ensure at least one source is provided
        if (!videoUrl && !videoPath) {
            return res.status(400).json({
                success: false,
                error: "You must provide a video file or a YouTube URL.",
            });
        }
        const updated = yield youtube_services_1.default.updateById(req.params.id, Object.assign({ title, videoUrl: videoUrl || undefined }, (videoPath && { videoPath })));
        if (!updated) {
            return res
                .status(404)
                .json({ success: false, message: "Video not found" });
        }
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateYoutubeVideo = updateYoutubeVideo;
/**
 * Delete a video by ID
 */
const deleteYoutubeVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield youtube_services_1.default.deleteById(req.params.id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Video not found" });
        }
        // ✅ ADD THIS BLOCK
        if (deleted.videoPath) {
            const filePath = path_1.default.join(__dirname, "../../../../", deleted.videoPath);
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error(" Error deleting file:", err.message);
                }
                else {
                    console.log(`🗑️ Deleted file: ${filePath}`);
                }
            });
        }
        // ✅ END OF NEW BLOCK
        res
            .status(200)
            .json({ success: true, message: "Video deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteYoutubeVideo = deleteYoutubeVideo;
