import { z } from "zod";
declare const RoomDtoSchema: z.ZodObject<{
    _id: z.ZodString;
    title: z.ZodString;
    participants: z.ZodNumber;
    youtubeVideoUrl: z.ZodURL;
    owner: z.ZodObject<{
        username: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const CreateRoomDtoSchema: z.ZodObject<{
    title: z.ZodString;
    youtubeVideoUrl: z.ZodURL;
}, z.core.$strip>;
export type RoomDto = z.infer<typeof RoomDtoSchema>;
export type CreateRoomDto = z.infer<typeof CreateRoomDtoSchema>;
export { RoomDtoSchema, CreateRoomDtoSchema };
