import { ObjectId } from "mongodb"
import { z } from "zod"
import { UserSchema } from "../auth/user.model"

export const MessageSchema = z.object({
    roomId: z.instanceof(ObjectId),
    author: UserSchema,
    content: z.string().min(1).max(250),
    dateTime: z.date()
})

export type Message = z.infer<typeof MessageSchema>;
