import { z } from "zod"
import { UsernameSchema } from "../auth/user.model";
import { username } from "better-auth/plugins";

export const RoomStateSchema = z.object({
    state: z.literal(["playing", "paused"]),
    time: z.number(),
    updatedAt: z.number() // Date/Time timestamp
}) 

export const RoomSchema =  z.object({
    title: z.string(),
    participants: z.number(),
    youtubeVideoUrl: z.string(),
    videoState: RoomStateSchema,
    owner: z.object({
        username: UsernameSchema
    })
})

export type Room = z.infer<typeof RoomSchema>;

type RoomState = z.infer<typeof RoomStateSchema>;