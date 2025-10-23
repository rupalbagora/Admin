"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverconfig_1 = __importDefault(require("./config/serverconfig"));
const auth_routes_1 = __importDefault(require("./apis/userApi/routes/auth.routes"));
const user_routes_1 = __importDefault(require("./apis/userApi/routes/user.routes"));
// import subscriptionRoute from "./apis/paymentApi/routes/subscription.routes"
// import  paymentRoutes from "./apis/paymentApi/routes/payment.routes"
// import subscriptionPlansRoutes from "./apis/paymentApi/routes/subscriptionPlan.routes"
// configer routes here
// import signupRoutes from "../src/apis/userApi/routes/signup.routes"
const signup_routes_1 = __importDefault(require("./apis/userApi/routes/signup.routes"));
// import subscriptionRoutes from './apis/paymentApi/routes/subscription.routes';
// app.use('/api/subscriptions', subscriptionRoutes);
const youtube_routes_1 = __importDefault(require("./apis/youtubeApi/routes/youtube.routes"));
const certificate_routes_1 = __importDefault(require("./apis/certificateApi/routes/certificate.routes"));
const packages_routes_1 = __importDefault(require("./apis/packagesApi/routes/packages.routes"));
const productPackage_routes_1 = __importDefault(require("./apis/productPackageApi/routes/productPackage.routes"));
const ourservice_route_1 = __importDefault(require("./apis/ourserviceApi/routes/ourservice.route"));
// import homeServiceRoutes from "../src/apis/homeServiceApi/routes/homeService.routes"
const homeService_routes_1 = __importDefault(require("./apis/homeServiceApi/routes/homeService.routes"));
const aboutSalon_routes_1 = __importDefault(require("./apis/aboutOurSalon/routes/aboutSalon.routes"));
serverconfig_1.default.use('/api/auth', auth_routes_1.default);
serverconfig_1.default.use('/api/users', user_routes_1.default);
serverconfig_1.default.use("/api/signup", signup_routes_1.default);
serverconfig_1.default.use("/api/youtube", youtube_routes_1.default);
serverconfig_1.default.use("/api/certificates", certificate_routes_1.default);
serverconfig_1.default.use("/api/packages", packages_routes_1.default);
serverconfig_1.default.use("/api/product-packages", productPackage_routes_1.default);
serverconfig_1.default.use("/api/ourservice", ourservice_route_1.default);
serverconfig_1.default.use("/api/home-services", homeService_routes_1.default);
serverconfig_1.default.use("/api/about-salon", aboutSalon_routes_1.default);
// app.use("/api/subscription",subscriptionRoute)
// app.use("/api/payments",paymentRoutes)
// app.use("/api/subscription-plans",subscriptionPlansRoutes)
// subscription-plans
exports.default = serverconfig_1.default;
