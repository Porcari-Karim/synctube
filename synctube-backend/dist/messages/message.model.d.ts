import { ObjectId } from "mongodb";
import { z } from "zod";
export declare const MessageSchema: z.ZodObject<{
    roomId: z.ZodCustom<ObjectId, ObjectId>;
    author: z.ZodObject<{
        username: z.ZodString;
        passwordHash: z.ZodString;
    }, z.core.$strip>;
    content: z.ZodString;
    dateTime: z.ZodDate;
}, z.core.$strip>;
export type Message = z.infer<typeof MessageSchema>;
//# sourceMappingURL=message.model.d.ts.map