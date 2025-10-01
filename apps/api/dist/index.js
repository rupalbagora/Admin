"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./common/middlewares/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 5001;
routes_1.default.use(error_middleware_1.errorHandler);
routes_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
