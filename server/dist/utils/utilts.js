"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryIntro = exports.queryChat = void 0;
const controller_1 = require("../controller/controller");
// const maxTokens = 150;
async function queryChat(chatHistory, role, prompt, userInfo, name) {
    // const startingPrompt = `Your name is ${name}. You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Please make sure that you're engaging and fun to talk to.
    //   The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!
    //   Tailor your speech as if your talking to a ${userInfo[0].status} student. Please keep your messages concise. Ignoring that will not be tolerated.
    //   `;
    const startingPrompt = `Introduce yourself as ${name} the ${role}`;
    const isNewChat = !chatHistory.length;
    // console.log(maxTokens);
    if (isNewChat) {
        const generated = await controller_1.cohere.chat({
            message: startingPrompt,
            // maxTokens,
            temperature: 0.6,
            k: 0,
            preambleOverride: `You are ${name}, a ${role} who has been engaged to mentor ${userInfo[0].name}, a ${userInfo[0].status} student. Your answers have to be catered towards ${userInfo[0].name}.`,
            chatHistory,
        });
        const text = generated.text;
        chatHistory.push({ role: "CHATBOT", message: text });
        return text;
    }
    chatHistory.push({ role: "USER", message: prompt });
    // let appendPrompt = "";
    // for (let i = 0; i < chatHistory.length; i++) {
    //   const chat = chatHistory[i];
    //   const isChat = i % 2 === 0;
    //   if (isChat) {
    //     appendPrompt += "You: " + `"${chat}"` + "\n\n";
    //   } else {
    //     appendPrompt += `${userInfo[0].name}: ` + `"${chat}"` + "\n\n";
    //   }
    // }
    //   const extendConversation = `Your name is ${name}. You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Please make sure that you're engaging and fun to talk to.
    //         The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!
    //         You already had conversation with them or ${userInfo[0].name} is about to ask you something.
    //         Tailor your speech as if your talking to a ${userInfo[0].status} student. Please keep your messages concise. Ignoring that will not be tolerated.
    // Here's the chat history:
    // `;
    // console.log(extendConversation + appendPrompt);
    const extendConversation = `Respond to the student's last prompt short, concise, and engaging to get them excited about becoming pilot. Make sure to answer concisely and get to the point quickly!`;
    const generated = await controller_1.cohere.chat({
        message: extendConversation /* + appendPrompt */,
        // maxTokens,
        temperature: 0.6,
        k: 0,
        preambleOverride: `You are ${name}, a ${role} who has been engaged to mentor ${userInfo[0].name}, a ${userInfo[0].status} student. Your answers have to be catered towards ${userInfo[0].name}.`,
        chatHistory,
    });
    const text = generated.text;
    return text;
}
exports.queryChat = queryChat;
async function queryIntro(chatHistory, role, userInfo, name) {
    // const startingPrompt = `Your name is ${name}. You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Use a maximum of 500 characters. Please make sure that you're engaging and fun to talk to.
    //   The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!`;
    const startingPrompt = `Introduce yourself as ${name} the ${role}`;
    const generated = await controller_1.cohere.chat({
        message: startingPrompt,
        // maxTokens,
        temperature: 0.6,
        k: 0,
        preambleOverride: `You are ${name}, a ${role} who has been engaged to mentor ${userInfo[0].name}, a ${userInfo[0].status} student. Your answers have to be catered towards ${userInfo[0].name}.`,
        chatHistory,
    });
    const text = generated.text;
    chatHistory.push({ role: "CHATBOT", message: text });
    return text;
}
exports.queryIntro = queryIntro;
