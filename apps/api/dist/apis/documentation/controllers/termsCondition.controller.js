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
exports.getTerms = exports.createOrUpdateTerms = void 0;
const termsCondition_model_1 = require("../models/termsCondition.model");
const termsCondition_validator_1 = require("../validators/termsCondition.validator");
const createOrUpdateTerms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = termsCondition_validator_1.termsConditionSchema.parse({
            title: req.body.title,
            content: req.body.content,
            accepted: req.body.accepted === "true" || req.body.accepted === true, // ✅ convert checkbox value
        });
        let doc = yield termsCondition_model_1.TermsCondition.findOne();
        if (doc) {
            doc.title = validated.title;
            doc.content = validated.content;
            doc.accepted = validated.accepted;
            yield doc.save();
            return res.status(200).json({ message: "Terms updated", data: doc });
        }
        doc = yield termsCondition_model_1.TermsCondition.create(validated);
        return res.status(201).json({ message: "Terms created", data: doc });
    }
    catch (error) {
        return res.status(400).json({ message: error.errors || error.message });
    }
});
exports.createOrUpdateTerms = createOrUpdateTerms;
const getTerms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield termsCondition_model_1.TermsCondition.findOne();
        if (!doc)
            return res.status(404).json({ message: "No Terms & Conditions found" });
        return res.status(200).json({ data: doc });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTerms = getTerms;
