import express from "express";
import { chatQuery, intro, saveStudentStatus } from "../controller/controller";
import { textToSpeech } from "../controller/text";

export const rootRouter = express.Router();

rootRouter.post("/saveStudentStatus", saveStudentStatus);
rootRouter.post("/chatQuery", chatQuery);
rootRouter.post("/intro", intro);
rootRouter.post("/textToSpeech", textToSpeech);

export default rootRouter;
