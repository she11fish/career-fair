import { Request, Response } from "express";
import {
  ChatQuerySchema,
  UserInfoSchema,
  UserInfoType,
} from "../schemas/schema";
import { ZodError } from "zod";
import { CohereClient } from "cohere-ai";
import { Role } from "../utils/types";
import { queryChat } from "../utils/utilts";

export const cohere = new CohereClient({
  token: "5HtOGjn5bCylKwATr2LNovvxZqj8r7tYD2QFZ7Oq",
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
const userInfo: Array<UserInfoType> = [];
const pilotConversationHistory: Array<string> = [];
const flightAttendantConversationHistory: Array<string> = [];

export function saveStudentStatus(req: Request, res: Response) {
  try {
    /* {
        status: Status;
        name: string;
    }*/
    const result = UserInfoSchema.parse(req.body);
    if (!userInfo.length) {
      userInfo.push(result);
    } else {
      userInfo[0] = result;
    }
    console.log(result);
    return res.send("Actually worked!");
  } catch (e) {
    if (e instanceof ZodError) {
      res.send(e);
      return;
    }
    return res.send("Unexpected error occured");
  }
}

export async function chatQuery(req: Request, res: Response) {
  try {
    const { role, prompt } = ChatQuerySchema.parse(req.body);
    const startingPrompt = `You will play the role of a ${role} who's role is to help a user figure out if they want to become a ${role} as their career. Your response format should focus on why someone should become a ${role}. Ask how you can help. Do not break character. Maximum response is 500 characters. Please make sure that you're engaging and fun to talk to.

    The person you're going to talk to is ${userInfo[0].name}. They are currently in ${userInfo[0].status}. Please use these information to make good relevant answers!`;
    switch (role) {
      case Role.PILOT: {
        return res.send(
          await queryChat(pilotConversationHistory, role, prompt, userInfo)
        );
      }
      case Role.FA: {
        return res.send(
          await queryChat(
            flightAttendantConversationHistory,
            role,
            prompt,
            userInfo
          )
        );
      }
    }
  } catch (e) {
    if (e instanceof ZodError) {
      res.send(e);
      return;
    }
    return res.send("Unexpected error occured");
  }
}
