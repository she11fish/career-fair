"use strict";
const voiceId = 148;
const url = "https://api.ttsmaker.com/v1/create-tts-order";
const headers = { "Content-Type": "application/json; charset=utf-8" };
const body = {
    token: "ttsmaker_demo_token",
    text: text,
    voice_id: voice_id,
    audio_format: "wav",
    audio_speed: 1.0,
    audio_volume: 0,
    language: "ar",
    text_paragraph_pause_time: 0,
};
const response = await fetch(url, { method: "POST", headers, body });
