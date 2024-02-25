"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const text_1 = require("../controller/text");
exports.rootRouter = express_1.default.Router();
exports.rootRouter.post("/saveStudentStatus", controller_1.saveStudentStatus);
exports.rootRouter.post("/chatQuery", controller_1.chatQuery);
exports.rootRouter.post("/intro", controller_1.intro);
exports.rootRouter.post("/textToSpeech", text_1.textToSpeech);
exports.default = exports.rootRouter;
