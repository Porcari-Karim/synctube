import { username } from "better-auth/plugins";
import { z } from "zod";
export const UsernameSchema = z.string().min(3, "Username is too short !").max(20, "Username is too long !");
export const UserSchema = z.object({
    username: UsernameSchema,
    passwordHash: z.string()
});
//# sourceMappingURL=user.model.js.map