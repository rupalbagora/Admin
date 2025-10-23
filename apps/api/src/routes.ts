import app from "./config/serverconfig";
import authRoutes from "./apis/userApi/routes/auth.routes"
import usersRoutes from "./apis/userApi/routes/user.routes"
// import subscriptionRoute from "./apis/paymentApi/routes/subscription.routes"
// import  paymentRoutes from "./apis/paymentApi/routes/payment.routes"
// import subscriptionPlansRoutes from "./apis/paymentApi/routes/subscriptionPlan.routes"
// configer routes here
// import signupRoutes from "../src/apis/userApi/routes/signup.routes"
import signupRoutes from "./apis/userApi/routes/signup.routes"
// import subscriptionRoutes from './apis/paymentApi/routes/subscription.routes';
// app.use('/api/subscriptions', subscriptionRoutes);
 import youtubeRoutes from "./apis/youtubeApi/routes/youtube.routes"
 import certificateRoutes from "./apis/certificateApi/routes/certificate.routes"
import packagesRoutes from "./apis/packagesApi/routes/packages.routes";
import productPackageRoutes from "./apis/productPackageApi/routes/productPackage.routes"
import ourServiceRoutes from "./apis/ourserviceApi/routes/ourservice.route";
// import homeServiceRoutes from "../src/apis/homeServiceApi/routes/homeService.routes"
import homeServiceRoutes from "./apis/homeServiceApi/routes/homeService.routes"
import aboutSalonRoutes from "./apis/aboutOurSalon/routes/aboutSalon.routes"


app.use('/api/auth', authRoutes);
app.use('/api/users',usersRoutes );
app.use("/api/signup",signupRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/product-packages", productPackageRoutes);
app.use("/api/ourservice", ourServiceRoutes);
app.use("/api/home-services", homeServiceRoutes);
app.use("/api/about-salon",aboutSalonRoutes);
// app.use("/api/subscription",subscriptionRoute)
// app.use("/api/payments",paymentRoutes)
// app.use("/api/subscription-plans",subscriptionPlansRoutes)
// subscription-plans

export default app;