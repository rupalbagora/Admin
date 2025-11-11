import app from "./config/serverconfig";
import authRoutes from "./apis/userApi/routes/auth.routes";
import usersRoutes from "./apis/userApi/routes/user.routes";
import youtubeRoutes from "./apis/youtubeApi/routes/youtube.routes";
import certificateRoutes from "./apis/certificateApi/routes/certificate.routes";
import packagesRoutes from "./apis/packageApi/routes/packages.routes"; //
import productPackageRoutes from "./apis/productPackageApi/routes/productPackage.routes";
import ourServiceRoutes from "./apis/ourserviceApi/routes/ourservice.route";
import homeServiceRoutes from "./apis/homeServiceApi/routes/homeService.routes";
import aboutSalonRoutes from "./apis/aboutOurSalon/routes/aboutSalon.routes";
import aboutUsRoutes from "./apis/documentation/routes/aboutUs.routes";
import privacyPolicyRoutes from "./apis/documentation/routes/privacyPolicy.routes";
import termsConditionRoutes from "./apis/documentation/routes/termsCondition.routes";
import offerRoutes from "./apis/offerApi/routes/offer.routes";
import productRoutes from "./apis/productApi/routes/product.routes";
import appointmentRoutes from "./apis/appointmentApi/routes/appointment.routes";
import razorpayRoutes from "./apis/razorpay/routes/razorpay.routes";
import cartRoutes from "./apis/cartApi/routes/cart.routes";
import notificationRoutes from "./apis/inAppNotification/routes/notification.routes";
//import  {login}  from "./apis/userApi/controllers/auth.controller";
//app.use("/api/login",login)
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/packages", packagesRoutes); //
app.use("/api/product-packages", productPackageRoutes);
app.use("/api/ourservice", ourServiceRoutes);
app.use("/api/home-services", homeServiceRoutes);
app.use("/api/about-salon", aboutSalonRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/privacy-policy", privacyPolicyRoutes);
app.use("/api/terms-and-conditions", termsConditionRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointments", appointmentRoutes);
// razorpay routes
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/cart", cartRoutes);

// notifications
app.use("/api/notification", notificationRoutes);
// app.use("/api/subscription",subscriptionRoute)
// app.use("/api/payments",paymentRoutes)
// app.use("/api/subscription-plans",subscriptionPlansRoutes)
// subscription-plans

export default app;
