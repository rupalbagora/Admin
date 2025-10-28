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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutUs = exports.createOrUpdateAboutUs = void 0;
const aboutUs_model_1 = require("../models/aboutUs.model");
const aboutUs_validator_1 = require("../validators/aboutUs.validator");
const createOrUpdateAboutUs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = aboutUs_validator_1.aboutUsSchema.parse({
            title: req.body.title,
            content: req.body.content,
        });
        let doc = yield aboutUs_model_1.AboutUs.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            doc.updatedAt = new Date();
            yield doc.save();
            return res.status(200).json({ message: "About Us updated", data: doc });
        }
        doc = yield aboutUs_model_1.AboutUs.create(validated);
        return res.status(201).json({ message: "About Us created", data: doc });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
});
exports.createOrUpdateAboutUs = createOrUpdateAboutUs;
const getAboutUs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield aboutUs_model_1.AboutUs.findOne();
        if (!doc)
            return res.status(404).json({ message: "No About Us found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAboutUs = getAboutUs;
