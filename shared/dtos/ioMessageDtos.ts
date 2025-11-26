import { string, z } from "zod"
import { UserDtoSchema } from "./authDtos.js";

export const JoinEventSchema = z.object({
    _id: z.string(),
    username: string(),
})

export type JoinEvent = z.infer<typeof JoinEventSchema>;

export const ErrorEventSchema = z.object({
    error: z.string()
})

export type ErrorEvent = z.infer<typeof ErrorEventSchema>;

export const MessageEventSchema = z.object({
    room_id: z.string(),
    sender: UserDtoSchema,
    text: z.string().min(1).max(200),
    datetime: z.number(),
})

export type MessageEvent = z.infer<typeof MessageEventSchema>;

export const PlayPauseEventSchema = z.object({
    time: z.number(),
    updatedAt: z.number() // Date/Time timestamp
})

export type PlayPauseEvent = z.infer<typeof PlayPauseEventSchema>;
