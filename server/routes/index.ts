import express from "express";
import { chatQuery, intro, saveStudentStatus } from "../controller/controller";

export const rootRouter = express.Router();

rootRouter.post("/saveStudentStatus", saveStudentStatus);
rootRouter.post("/chatQuery", chatQuery);
rootRouter.post("/intro", intro);

export default rootRouter;
