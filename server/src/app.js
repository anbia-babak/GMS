import express from "express";
// importing the memberRoutes to CONNECT it with app.js file:
import memberRoutes from "./routes/memberRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/members", memberRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/payments", paymentRoutes)
export default app;