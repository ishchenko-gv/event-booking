import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { connectDatabase } from "./db";

import { userRouter } from "./user/handlers";

connectDatabase();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.use("/users", userRouter);

app.listen(8000, () =>
  console.info("Server is running on http://localhost:8000"),
);
