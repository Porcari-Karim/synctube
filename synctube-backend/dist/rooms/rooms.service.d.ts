import { type CreateRoomDto, type RoomDto } from "shared";
export declare const roomService: {
    getRooms: (search: string) => Promise<RoomDto[]>;
    createRoom: (room: CreateRoomDto) => Promise<void>;
    deleteRoom: (roomId: string) => Promise<void>;
    getRoomById: (roomId: string) => Promise<import("mongodb").WithId<{
        title: string;
        participants: number;
        youtubeVideoUrl: string;
        videoState: {
            state: "playing" | "paused";
            time: number;
            updatedAt: number;
        };
        owner: {
            username: string;
        };
    }> | null>;
};
//# sourceMappingURL=rooms.service.d.ts.map