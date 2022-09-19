import express from "express";
import { createUserController } from "../../../use-case/create-user";

const userRouter = express.Router();

userRouter.post("/", (req, res) => createUserController.execute(req, res));

export { userRouter };
