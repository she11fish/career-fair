"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToSpeech = void 0;
const zod_1 = require("zod");
const schema_1 = require("../schemas/schema");
async function textToSpeech(req, res) {
    try {
        const { text } = schema_1.TextToSpeechSchema.parse(req.body);
        const voiceId = 148;
        const url = "https://api.ttsmaker.com/v1/create-tts-order";
        const headers = { "Content-Type": "application/json; charset=utf-8" };
        const body = {
            token: "ttsmaker_demo_token",
            text: text,
            voice_id: voiceId,
            audio_format: "wav",
            audio_speed: 1.0,
            audio_volume: 0,
            language: "en",
            text_paragraph_pause_time: 0,
        };
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return res.send(data);
    }
    catch (e) {
        if (e instanceof zod_1.ZodError) {
            res.send(e);
            return;
        }
        return res.send("Unexpected error occured");
    }
}
exports.textToSpeech = textToSpeech;
