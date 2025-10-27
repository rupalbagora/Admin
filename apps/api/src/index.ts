import express from "express";
import path from "path";


import { errorHandler } from "./common/middlewares/error.middleware";
import app from "./routes";
const PORT = process.env.PORT || 5001;


//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



