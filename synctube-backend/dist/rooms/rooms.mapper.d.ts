import { type WithId } from "mongodb";
import type { Room } from "./rooms.model";
import type { RoomDto } from "shared";
export declare const roomMapper: {
    mapToDto: (room: WithId<Room>) => RoomDto;
    mapToModel: (roomDto: RoomDto) => WithId<Room>;
    mapToModelOmitId: (roomDto: Omit<RoomDto, "_id">) => Room;
};
//# sourceMappingURL=rooms.mapper.d.ts.map