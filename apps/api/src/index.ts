import express from "express";
import path from "path";

import { errorHandler } from "./common/middlewares/error.middleware";
import app from "./routes";
import { cancelAppointmentAfter10Minutes } from "./apis/cronJob/cancelAppointment";
import { delete7daysOldNotifications } from "./apis/cronJob/deleteOldNotifications";
const PORT = process.env.PORT || 5001;

//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use(errorHandler);
app.listen(PORT, () => {
	cancelAppointmentAfter10Minutes();
	delete7daysOldNotifications();
	console.log(`Server running on http://localhost:${PORT}`);
});
