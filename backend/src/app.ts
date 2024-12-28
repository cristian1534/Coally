import express from "express";
import cors from "cors";
import { initDB } from "./task/infrastructure/database/mongo";
import taskRoutes from "./task/infrastructure/routes/task.routes";

const app = express();

initDB();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
