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
exports.getPrivacy = exports.createOrUpdatePrivacy = void 0;
const privacyPolicy_model_1 = require("../models/privacyPolicy.model");
const privacyPolicy_validator_1 = require("../validators/privacyPolicy.validator");
const createOrUpdatePrivacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = privacyPolicy_validator_1.privacyPolicySchema.parse({
            title: req.body.title,
            content: req.body.content,
        });
        let doc = yield privacyPolicy_model_1.PrivacyPolicy.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            yield doc.save();
            return res.status(200).json({ message: "Privacy Policy updated", data: doc });
        }
        doc = yield privacyPolicy_model_1.PrivacyPolicy.create(validated);
        return res.status(201).json({ message: "Privacy Policy created", data: doc });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
});
exports.createOrUpdatePrivacy = createOrUpdatePrivacy;
const getPrivacy = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield privacyPolicy_model_1.PrivacyPolicy.findOne();
        if (!doc)
            return res.status(404).json({ message: "No Privacy Policy found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPrivacy = getPrivacy;
