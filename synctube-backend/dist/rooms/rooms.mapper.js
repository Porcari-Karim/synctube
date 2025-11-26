import { ObjectId } from "mongodb";
const mapToDto = (room) => ({
    _id: room._id.toString(),
    participants: room.participants,
    title: room.title,
    youtubeVideoUrl: room.youtubeVideoUrl,
    owner: room.owner
});
const mapToModel = (roomDto) => ({
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
const mapToModelOmitId = (roomDto) => ({
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
};
//# sourceMappingURL=rooms.mapper.js.map