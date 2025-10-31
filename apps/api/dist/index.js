"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const error_middleware_1 = require("./common/middlewares/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 5001;
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
routes_1.default.use(
	"/uploads",
	express_1.default.static(path_1.default.resolve(__dirname, "../uploads"))
);
routes_1.default.use(error_middleware_1.errorHandler);
routes_1.default.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
