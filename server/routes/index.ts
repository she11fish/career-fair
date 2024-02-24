import express from "express";
import { chatQuery, saveStudentStatus } from "../controller/controller";

export const rootRouter = express.Router();

rootRouter.post("/saveStudentStatus", saveStudentStatus);
rootRouter.post("/chatQuery", chatQuery);

export default rootRouter;
