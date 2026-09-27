import express from "express";
// importing the memberRoutes to CONNECT it with app.js file:
import memberRoutes from "./routes/memberRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/members", memberRoutes);
export default app;