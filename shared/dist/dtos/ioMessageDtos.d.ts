import { z } from "zod";
export declare const JoinEventSchema: z.ZodObject<{
    _id: z.ZodString;
    username: z.ZodString;
}, z.core.$strip>;
export type JoinEvent = z.infer<typeof JoinEventSchema>;
export declare const ErrorEventSchema: z.ZodObject<{
    error: z.ZodString;
}, z.core.$strip>;
export type ErrorEvent = z.infer<typeof ErrorEventSchema>;
export declare const MessageEventSchema: z.ZodObject<{
    room_id: z.ZodString;
    sender: z.ZodObject<{
        username: z.ZodString;
    }, z.core.$strip>;
    text: z.ZodString;
    datetime: z.ZodNumber;
}, z.core.$strip>;
export type MessageEvent = z.infer<typeof MessageEventSchema>;
export declare const PlayPauseEventSchema: z.ZodObject<{
    time: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, z.core.$strip>;
export type PlayPauseEvent = z.infer<typeof PlayPauseEventSchema>;
