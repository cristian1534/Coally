import express from "express";
import cors from "cors";
import { initDB } from "./task/infrastructure/database/mongo";
import taskRoutes from "./task/infrastructure/routes/task.routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./task/infrastructure/docs/swagger";
import {SwaggerTheme, SwaggerThemeNameEnum} from "swagger-themes";
import "dotenv/config";

const app = express();
const specs = swaggerJSDoc(options);
const swaggerUiOptions = {
	explorer: true,
	customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.ONE_DARK),
};

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs, swaggerUiOptions));


app.listen(PORT, () => {
  process.env.NODE_ENV === "development"
    ? console.log(`Server running at ${PORT}, Development`)
    : console.log(`Server running at ${PORT}, Production`);
});

initDB();

export default app;