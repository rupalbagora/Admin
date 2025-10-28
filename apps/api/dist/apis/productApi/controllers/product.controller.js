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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_services_1 = __importDefault(require("../services/product.services"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customReq = req;
    try {
        const { name, price, offer, rating, tag } = req.body;
        const addedBy = (_a = customReq.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!customReq.file)
            return res.status(400).json({ success: false, message: "Image is required!" });
        const image = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
        const product = yield product_services_1.default.create({
            name,
            price,
            offer,
            rating,
            tag,
            image,
        });
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_services_1.default.getAll();
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_services_1.default.getById(req.params.id);
        if (!product)
            return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const { id } = req.params;
        const existing = yield product_services_1.default.getById(id);
        if (!existing)
            return res.status(404).json({ success: false, message: "Product not found" });
        let image = existing.image;
        if (customReq.file) {
            const oldPath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(existing.image));
            if (fs_1.default.existsSync(oldPath))
                fs_1.default.unlinkSync(oldPath);
            image = `${req.protocol}://${req.get("host")}/uploads/images/${customReq.file.filename}`;
        }
        const updated = yield product_services_1.default.updateById(id, Object.assign(Object.assign({}, req.body), { image }));
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_services_1.default.getById(id);
        if (!product)
            return res.status(404).json({ success: false, message: "Product not found" });
        const imgPath = path_1.default.join(__dirname, "../../../../uploads/images", path_1.default.basename(product.image));
        if (fs_1.default.existsSync(imgPath))
            fs_1.default.unlinkSync(imgPath);
        yield product_services_1.default.deleteById(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
