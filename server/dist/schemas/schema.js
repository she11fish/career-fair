"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToSpeechSchema = exports.IntroQuerySchema = exports.ChatQuerySchema = exports.UserInfoSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../utils/types");
exports.UserInfoSchema = zod_1.z
    .object({
    status: zod_1.z.nativeEnum(types_1.Status),
    name: zod_1.z.string(),
})
    .strict();
exports.ChatQuerySchema = zod_1.z
    .object({
    role: zod_1.z.nativeEnum(types_1.Role),
    prompt: zod_1.z.string(),
})
    .strict();
exports.IntroQuerySchema = zod_1.z
    .object({
    role: zod_1.z.nativeEnum(types_1.Role),
})
    .strict();
exports.TextToSpeechSchema = zod_1.z.object({
    text: zod_1.z.string(),
});
