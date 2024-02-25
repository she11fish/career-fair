import { Request, Response } from "express";
import {
  ChatQuerySchema,
  IntroQuerySchema,
  UserInfoSchema,
  UserInfoType,
} from "../schemas/schema";
import { ZodError } from "zod";
import { CohereClient } from "cohere-ai";
import { Role } from "../utils/types";
import { queryChat, queryIntro } from "../utils/utilts";
import { ChatMessage } from "cohere-ai/api";
import dotenv from "dotenv";
dotenv.config();
export const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
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
const pilotConversationHistory: Array<ChatMessage> = [];
const flightAttendantConversationHistory: Array<ChatMessage> = [];
const nurseConversationHistory: Array<ChatMessage> = [];
const researcherConversationHistory: Array<ChatMessage> = [];
const gameDeveloperConversationHistory: Array<ChatMessage> = [];
const musicianConversationHistory: Array<ChatMessage> = [];

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
    switch (role) {
      case Role.PILOT: {
        return res.send(
          await queryChat(
            pilotConversationHistory,
            role,
            prompt,
            userInfo,
            "Tonny"
          )
        );
      }
      case Role.FA: {
        return res.send(
          await queryChat(
            flightAttendantConversationHistory,
            role,
            prompt,
            userInfo,
            "Ayo"
          )
        );
      }
      case Role.NURSE: {
        return res.send(
          await queryChat(
            nurseConversationHistory,
            role,
            prompt,
            userInfo,
            "Nancy"
          )
        );
      }
      case Role.RESEARCHER: {
        return res.send(
          await queryChat(
            researcherConversationHistory,
            role,
            prompt,
            userInfo,
            "Ron"
          )
        );
      }
      case Role.GAMEDEV: {
        return res.send(
          await queryChat(
            gameDeveloperConversationHistory,
            role,
            prompt,
            userInfo,
            "Nathan"
          )
        );
      }
      case Role.MUSICIAN: {
        return res.send(
          await queryChat(
            musicianConversationHistory,
            role,
            prompt,
            userInfo,
            "Mark"
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

export async function intro(req: Request, res: Response) {
  try {
    const { role } = IntroQuerySchema.parse(req.body);
    console.log("HERE");
    switch (role) {
      case Role.PILOT: {
        return res.send(
          await queryIntro(pilotConversationHistory, role, userInfo, "Tonny")
        );
      }
      case Role.FA: {
        return res.send(
          await queryIntro(
            flightAttendantConversationHistory,
            role,
            userInfo,
            "Ayo"
          )
        );
      }
      case Role.NURSE: {
        return res.send(
          await queryIntro(nurseConversationHistory, role, userInfo, "Nancy")
        );
      }
      case Role.RESEARCHER: {
        return res.send(
          await queryIntro(researcherConversationHistory, role, userInfo, "Ron")
        );
      }
      case Role.GAMEDEV: {
        return res.send(
          await queryIntro(
            gameDeveloperConversationHistory,
            role,
            userInfo,
            "Nathan"
          )
        );
      }
      case Role.MUSICIAN: {
        return res.send(
          await queryIntro(musicianConversationHistory, role, userInfo, "Mark")
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
