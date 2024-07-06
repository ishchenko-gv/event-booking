import express from "express";

const userRouter = express.Router();

userRouter.get("/me", (req, res) => {
  res.send("It's me!");
});

export { userRouter };
