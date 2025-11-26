import { z } from "zod";
import { UserDtoSchema } from "./authDtos.js";
function getYouTubeVideoId(str) {
    try {
        const url = new URL(str);
        const hostname = url.hostname.toLowerCase();
        if (hostname === "youtu.be") {
            const videoId = url.pathname.slice(1);
            return videoId.length === 11 ? videoId : null;
        }
        if (hostname === "youtube.com" || hostname === "www.youtube.com") {
            if (url.pathname === "/watch") {
                const videoId = url.searchParams.get("v");
                return videoId && videoId.length === 11 ? videoId : null;
            }
        }
        return null;
    }
    catch {
        return null;
    }
}
const youtubeVideoUrlSchema = z
    .url("Not a valid URL")
    .refine((val) => getYouTubeVideoId(val) !== null, "Not a valid YouTube video URL");
const RoomDtoSchema = z.object({
    _id: z.string(),
    title: z.string().min(1).max(25),
    participants: z.number(),
    youtubeVideoUrl: youtubeVideoUrlSchema,
    owner: UserDtoSchema
});
const CreateRoomDtoSchema = RoomDtoSchema.omit({ _id: true, participants: true, owner: true });
export { RoomDtoSchema, CreateRoomDtoSchema };
