import { ObjectId, type WithId } from "mongodb"
import type { Room } from "./rooms.model"
import type { RoomDto } from "shared"

const mapToDto = (room: WithId<Room>): RoomDto =>  ({
        _id: room._id.toString(),
        participants: room.participants,
        title: room.title,
        youtubeVideoUrl: room.youtubeVideoUrl,
        owner: room.owner
    });

const mapToModel = (roomDto: RoomDto): WithId<Room> => ({
        _id: new ObjectId(roomDto._id),
        participants: roomDto.participants,
        title: roomDto.title,
        youtubeVideoUrl: roomDto.youtubeVideoUrl,
        videoState: {
            state: "paused",
            time: 0,
            updatedAt: Date.now()
        },
        owner: roomDto.owner
    });

const mapToModelOmitId = (roomDto: Omit<RoomDto, "_id">): Room => ({
        participants: roomDto.participants,
        title: roomDto.title,
        youtubeVideoUrl: roomDto.youtubeVideoUrl,
        videoState: {
            state: "paused",
            time: 0,
            updatedAt: Date.now()
        },
        owner: roomDto.owner
    });

export const roomMapper = {
    mapToDto,
    mapToModel,
    mapToModelOmitId
}