import { z } from "zod";
export declare const RoomStateSchema: z.ZodObject<{
    state: z.ZodLiteral<"playing" | "paused">;
    time: z.ZodNumber;
    updatedAt: z.ZodNumber;
}, z.core.$strip>;
export declare const RoomSchema: z.ZodObject<{
    title: z.ZodString;
    participants: z.ZodNumber;
    youtubeVideoUrl: z.ZodString;
    videoState: z.ZodObject<{
        state: z.ZodLiteral<"playing" | "paused">;
        time: z.ZodNumber;
        updatedAt: z.ZodNumber;
    }, z.core.$strip>;
    owner: z.ZodObject<{
        username: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type Room = z.infer<typeof RoomSchema>;
//# sourceMappingURL=rooms.model.d.ts.map