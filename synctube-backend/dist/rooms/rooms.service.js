import { ObjectId } from "mongodb";
import { roomRepository } from "./rooms.repository.js";
import {} from "shared";
import { roomMapper } from "./rooms.mapper.js";
import { context } from "../sessions/sessionAsyncLocalStorage.js";
import { Protected } from "../auth/auth.annotation.js";
const getRooms = async (search) => {
    console.log("Fetching rooms from the database with search : " + search);
    if (search && search != "") {
        return (await roomRepository.find({ title: { $regex: search, $options: "i" } }).toArray()).map(roomMapper.mapToDto);
    }
    return (await roomRepository.find().toArray()).map(roomMapper.mapToDto);
};
const createRoom = Protected(async (room) => {
    await roomRepository.insertOne(roomMapper.mapToModelOmitId({ ...room, participants: 0, owner: { username: context.getStore().session.user.username } }));
});
const deleteRoom = Protected(async (roomId) => {
    await roomRepository.deleteOne({ _id: new ObjectId(roomId) });
});
const getRoomById = Protected(async (roomId) => {
    return await roomRepository.findOne({ _id: ObjectId.createFromHexString(roomId) });
});
export const roomService = {
    getRooms,
    createRoom,
    deleteRoom,
    getRoomById,
};
//# sourceMappingURL=rooms.service.js.map