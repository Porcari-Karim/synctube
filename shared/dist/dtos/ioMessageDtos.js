import { string, z } from "zod";
import { UserDtoSchema } from "./authDtos.js";
export const JoinEventSchema = z.object({
    _id: z.string(),
    username: string(),
});
export const ErrorEventSchema = z.object({
    error: z.string()
});
export const MessageEventSchema = z.object({
    room_id: z.string(),
    sender: UserDtoSchema,
    text: z.string().min(1).max(200),
    datetime: z.number(),
});
export const PlayPauseEventSchema = z.object({
    time: z.number(),
    updatedAt: z.number() // Date/Time timestamp
});
