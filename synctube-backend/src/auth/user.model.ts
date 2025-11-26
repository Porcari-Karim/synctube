import { username } from "better-auth/plugins";
import { z } from "zod"

export const UsernameSchema = z.string().min(3, "Username is too short !").max(20, "Username is too long !")


export const UserSchema = z.object({
    username: UsernameSchema,
    passwordHash: z.string()
})

export type User = z.infer<typeof UserSchema>;