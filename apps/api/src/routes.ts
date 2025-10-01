import app from "./config/serverconfig";
import authRoutes from "./apis/userApi/routes/auth.routes"
import usersRoutes from "./apis/userApi/routes/user.routes"
// import subscriptionRoute from "./apis/paymentApi/routes/subscription.routes"
import  paymentRoutes from "./apis/paymentApi/routes/payment.routes"
import subscriptionPlansRoutes from "./apis/paymentApi/routes/subscriptionPlan.routes"
// configer routes here

import subscriptionRoutes from './apis/paymentApi/routes/subscription.routes';
app.use('/api/subscriptions', subscriptionRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users',usersRoutes );


// app.use("/api/subscription",subscriptionRoute)
// app.use("/api/payments",paymentRoutes)
// app.use("/api/subscription-plans",subscriptionPlansRoutes)
// subscription-plans

export default app;