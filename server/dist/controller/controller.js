"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intro = exports.chatQuery = exports.saveStudentStatus = exports.cohere = void 0;
const schema_1 = require("../schemas/schema");
const zod_1 = require("zod");
const cohere_ai_1 = require("cohere-ai");
const types_1 = require("../utils/types");
const utilts_1 = require("../utils/utilts");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.cohere = new cohere_ai_1.CohereClient({
    token: process.env.COHERE_API_KEY,
});
// Note to self
/*
Hello! Hopefully you're doing well. I'm Dr. Sophia Reyes, and I'm here to tell you why you should consider becoming a
pilot.

The occupation of piloting an aircraft offers many advantageous opportunities and is a unique career path. Pilots have
the privilege of experiencing breathtaking sceneries and perspectives that most individuals will never encounter.
Furthermore, a career as a pilot fosters the development of exceptional skills and abilities, such as spatial awareness,
decision-making under pressure, and meticulous attention to detail. As a pilot, you will also have the opportunity to
travel and meet new people.

Feel free to ask any questions you may have about being a pilot, and I will gladly provide you with all the information
you may require.
*/
const userInfo = [];
const pilotConversationHistory = [];
const flightAttendantConversationHistory = [];
const nurseConversationHistory = [];
const researcherConversationHistory = [];
const gameDeveloperConversationHistory = [];
const musicianConversationHistory = [];
function saveStudentStatus(req, res) {
    try {
        /* {
            status: Status;
            name: string;
        }*/
        const result = schema_1.UserInfoSchema.parse(req.body);
        if (!userInfo.length) {
            userInfo.push(result);
        }
        else {
            userInfo[0] = result;
        }
        console.log(result);
        return res.send("Actually worked!");
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.send(e);
            return;
        }
        return res.send("Unexpected error occured");
    }
}
exports.saveStudentStatus = saveStudentStatus;
async function chatQuery(req, res) {
    try {
        const { role, prompt } = schema_1.ChatQuerySchema.parse(req.body);
        switch (role) {
            case types_1.Role.PILOT: {
                return res.send(await (0, utilts_1.queryChat)(pilotConversationHistory, role, prompt, userInfo, "Tonny"));
            }
            case types_1.Role.FA: {
                return res.send(await (0, utilts_1.queryChat)(flightAttendantConversationHistory, role, prompt, userInfo, "Ayo"));
            }
            case types_1.Role.NURSE: {
                return res.send(await (0, utilts_1.queryChat)(nurseConversationHistory, role, prompt, userInfo, "Nancy"));
            }
            case types_1.Role.RESEARCHER: {
                return res.send(await (0, utilts_1.queryChat)(researcherConversationHistory, role, prompt, userInfo, "Ron"));
            }
            case types_1.Role.GAMEDEV: {
                return res.send(await (0, utilts_1.queryChat)(gameDeveloperConversationHistory, role, prompt, userInfo, "Nathan"));
            }
            case types_1.Role.MUSICIAN: {
                return res.send(await (0, utilts_1.queryChat)(musicianConversationHistory, role, prompt, userInfo, "Mark"));
            }
        }
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.send(e);
            return;
        }
        return res.send("Unexpected error occured");
    }
}
exports.chatQuery = chatQuery;
async function intro(req, res) {
    try {
        const { role } = schema_1.IntroQuerySchema.parse(req.body);
        console.log("HERE");
        switch (role) {
            case types_1.Role.PILOT: {
                return res.send(await (0, utilts_1.queryIntro)(pilotConversationHistory, role, userInfo, "Tonny"));
            }
            case types_1.Role.FA: {
                return res.send(await (0, utilts_1.queryIntro)(flightAttendantConversationHistory, role, userInfo, "Ayo"));
            }
            case types_1.Role.NURSE: {
                return res.send(await (0, utilts_1.queryIntro)(nurseConversationHistory, role, userInfo, "Nancy"));
            }
            case types_1.Role.RESEARCHER: {
                return res.send(await (0, utilts_1.queryIntro)(researcherConversationHistory, role, userInfo, "Ron"));
            }
            case types_1.Role.GAMEDEV: {
                return res.send(await (0, utilts_1.queryIntro)(gameDeveloperConversationHistory, role, userInfo, "Nathan"));
            }
            case types_1.Role.MUSICIAN: {
                return res.send(await (0, utilts_1.queryIntro)(musicianConversationHistory, role, userInfo, "Mark"));
            }
        }
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.send(e);
            return;
        }
        return res.send("Unexpected error occured");
    }
}
exports.intro = intro;
