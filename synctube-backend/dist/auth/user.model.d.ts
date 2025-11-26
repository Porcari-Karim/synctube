import { z } from "zod";
export declare const UsernameSchema: z.ZodString;
export declare const UserSchema: z.ZodObject<{
    username: z.ZodString;
    passwordHash: z.ZodString;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
//# sourceMappingURL=user.model.d.ts.map