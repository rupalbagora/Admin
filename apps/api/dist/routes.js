"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverconfig_1 = __importDefault(require("./config/serverconfig"));
const auth_routes_1 = __importDefault(require("./apis/userApi/routes/auth.routes"));
const user_routes_1 = __importDefault(require("./apis/userApi/routes/user.routes"));
const youtube_routes_1 = __importDefault(require("./apis/youtubeApi/routes/youtube.routes"));
const certificate_routes_1 = __importDefault(require("./apis/certificateApi/routes/certificate.routes"));
const packages_routes_1 = __importDefault(require("./apis/packageApi/routes/packages.routes")); // 
const productPackage_routes_1 = __importDefault(require("./apis/productPackageApi/routes/productPackage.routes"));
const ourservice_route_1 = __importDefault(require("./apis/ourserviceApi/routes/ourservice.route"));
const homeService_routes_1 = __importDefault(require("./apis/homeServiceApi/routes/homeService.routes"));
const aboutSalon_routes_1 = __importDefault(require("./apis/aboutOurSalon/routes/aboutSalon.routes"));
const aboutUs_routes_1 = __importDefault(require("./apis/documentation/routes/aboutUs.routes"));
const privacyPolicy_routes_1 = __importDefault(require("./apis/documentation/routes/privacyPolicy.routes"));
const termsCondition_routes_1 = __importDefault(require("./apis/documentation/routes/termsCondition.routes"));
const offer_routes_1 = __importDefault(require("./apis/offerApi/routes/offer.routes"));
const product_routes_1 = __importDefault(require("./apis/productApi/routes/product.routes"));
const appointment_routes_1 = __importDefault(require("./apis/appointmentApi/routes/appointment.routes"));
serverconfig_1.default.use("/api/auth", auth_routes_1.default);
serverconfig_1.default.use("/api/users", user_routes_1.default);
serverconfig_1.default.use("/api/youtube", youtube_routes_1.default);
serverconfig_1.default.use("/api/certificates", certificate_routes_1.default);
serverconfig_1.default.use("/api/packages", packages_routes_1.default); // 
serverconfig_1.default.use("/api/product-packages", productPackage_routes_1.default);
serverconfig_1.default.use("/api/ourservice", ourservice_route_1.default);
serverconfig_1.default.use("/api/home-services", homeService_routes_1.default);
serverconfig_1.default.use("/api/about-salon", aboutSalon_routes_1.default);
serverconfig_1.default.use("/api/about-us", aboutUs_routes_1.default);
serverconfig_1.default.use("/api/privacy-policy", privacyPolicy_routes_1.default);
serverconfig_1.default.use("/api/terms-and-conditions", termsCondition_routes_1.default);
serverconfig_1.default.use("/api/offers", offer_routes_1.default);
serverconfig_1.default.use("/api/products", product_routes_1.default);
serverconfig_1.default.use("/api/appointments", appointment_routes_1.default);
exports.default = serverconfig_1.default;
