import { z } from "zod";
import { Role, Status } from "../utils/types";
export const UserInfoSchema = z
  .object({
    status: z.nativeEnum(Status),
    name: z.string(),
  })
  .strict();

export type UserInfoType = z.infer<typeof UserInfoSchema>;

export const ChatQuerySchema = z
  .object({
    role: z.nativeEnum(Role),
    prompt: z.string(),
  })
  .strict();

export const IntroQuerySchema = z
  .object({
    role: z.nativeEnum(Role),
  })
  .strict();
