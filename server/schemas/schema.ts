import { z } from "zod";
import { Role, Status } from "../utils/types";
export const UserInfoSchema = z.object({
  status: z.nativeEnum(Status),
  name: z.string(),
});

export type UserInfoType = z.infer<typeof UserInfoSchema>;

export const ChatQuerySchema = z.object({
  role: z.nativeEnum(Role),
  prompt: z.string(),
});
