import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

// mongodb connector
import { connectdb } from "./utils/db-con.js";

// routers
import userRouter from "./routes/user.js";
import pharmacyRouter from "./routes/pharmacy.js";
import medicationRouter from "./routes/medication.js";
import customerRouter from "./routes/customer.js";
import transitionRouter from "./routes/transition.js";

// middleware
import { isLoggedInCheck } from "./middlewares/auth.js";

const app = express();
const port = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGO_URI;

connectdb(MONGODB_URI);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));

app.use(isLoggedInCheck);

app.get("/api", (req, res) => {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }
  return res.status(200).json({ user: req.user });
});

app.use("/api/user", userRouter);
app.use("/api/pharmacy", pharmacyRouter);
app.use("/api/medications", medicationRouter);
app.use("/api/customer", customerRouter);
app.use("/api/transition", transitionRouter);

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  if (!status) {
    next();
  }
  return res.status(status).json({ error: message, status: status });
});

app.listen(port, () => {
  console.log(`pharmacy app listening on port ${port}`);
});
