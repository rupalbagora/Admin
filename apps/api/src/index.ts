import { errorHandler } from "./common/middlewares/error.middleware";
import app from "./routes";
const PORT = process.env.PORT || 5001;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
