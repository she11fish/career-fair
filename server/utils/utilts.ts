import { Role } from "./types";
import { cohere } from "../controller/controller";
import { UserInfoType } from "../schemas/schema";

export async function queryChat(
  chatHistory: Array<string>,
  role: Role,
  prompt: string,
  userInfo: Array<UserInfoType>
) {
  const startingPrompt = `You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Maximum response is 500 characters. Please make sure that you're engaging and fun to talk to.

    The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!`;

  const isNewChat = !chatHistory.length;
  if (isNewChat) {
    const generated = await cohere.generate({
      prompt: startingPrompt,
    });
    const text = generated.generations[0].text;
    chatHistory.push(text);
    return text;
  }
  chatHistory.push(prompt);
  let appendPrompt = "";
  for (let i = 0; i < chatHistory.length; i++) {
    const chat = chatHistory[i];
    const isChat = i % 2 === 0;
    if (isChat) {
      appendPrompt += "You: " + `"${chat}"` + "\n\n";
    } else {
      appendPrompt += `${userInfo[0].name}: ` + `"${chat}"` + "\n\n";
    }
  }
  const extendConversation = `You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Maximum response is 500 characters. Please make sure that you're engaging and fun to talk to.

        The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!
        You already had conversation with them or ${userInfo[0].name} is about to ask you something
Here's the chat history:
`;
  console.log(extendConversation + appendPrompt);
  const generated = await cohere.generate({
    prompt: extendConversation + appendPrompt,
  });
  const text = generated.generations[0].text;
  return text;
}
