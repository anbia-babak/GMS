import express from "express";
// importing the memberRoutes to CONNECT it with app.js file:
import memberRoutes from "./routes/memberRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

import session from "express-session";
import pgSession from "connect-pg-simple";
import pool from "./db/pool.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);


app.use("/api/members", authMiddleware, memberRoutes);
app.use("/api/memberships", authMiddleware, membershipRoutes);
app.use("/api/payments", authMiddleware, paymentRoutes);
app.use("/api/reports", authMiddleware, reportRoutes);
app.use("/api/settings", authMiddleware, settingsRoutes);
app.use("/api/auth", authRoutes);
export default app;



