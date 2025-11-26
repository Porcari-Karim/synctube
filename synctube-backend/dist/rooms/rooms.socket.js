import { Server as IoServer, Socket } from "socket.io";
import {} from "node:http";
import { ErrorEventSchema, IoEvent, JoinEventSchema, MessageEventSchema, PlayPauseEventSchema } from "shared";
import { ObjectId } from "mongodb";
import { sessionMiddleware } from "../sessions/session.middleware.js";
import { roomRepository } from "./rooms.repository.js";
import { roomService } from "./rooms.service.js";
export const useIo = (server) => {
    const io = new IoServer(server, {
        cors: {
            credentials: true,
            methods: ["*"],
            origin: process.env.FRONTEND_URL
        }
    });
    io.engine.use(sessionMiddleware);
    io.on("connection", (socket) => {
        // console.log(!(socket.request as any).session)
        console.log("Connected as: " + socket.request.session.user.username);
        if (!socket.request.session) {
            socket.emit(IoEvent.Error, { error: "Please Log In before trying to connect to as socket !" });
            socket.disconnect();
            return;
        }
        socket.data.session = socket.request.session;
        socket.data.room = null;
        socket.on(IoEvent.Join, async (data) => {
            const parsedData = JoinEventSchema.safeParse(data);
            if (!parsedData.success) {
                socket.emit(IoEvent.Error, { error: "Bad event payload !" });
                return;
            }
            const event = parsedData.data;
            const room = await roomRepository.findOne({ _id: ObjectId.createFromHexString(event._id) });
            if (!room) {
                socket.emit(IoEvent.Error, { error: "No room with id: " + event._id });
                return;
            }
            socket.join(event._id);
            socket.data.room = room;
            io.to(room._id.toString()).emit(IoEvent.Join, data);
            roomRepository.updateOne({ _id: room._id }, { $set: { participants: room.participants + 1 } });
            console.log(socket.data.session.user.username + " joined room " + data._id);
        });
        socket.on("disconnect", async () => {
            if (!socket.data.room) {
                // socket.emit(IoEvent.Error, {error: "Please join a room before trying to send messages !"})
                return;
            }
            const room = await roomRepository.findOne({ _id: socket.data.room._id });
            roomRepository.updateOne({ _id: room._id }, { $set: { participants: room.participants - 1 } });
        });
        socket.on(IoEvent.Message, async (data) => {
            if (!socket.data.room) {
                socket.emit(IoEvent.Error, { error: "Please join a room before trying to send messages !" });
                return;
            }
            const parsedData = MessageEventSchema.safeParse(data);
            if (!parsedData.success) {
                socket.emit(IoEvent.Error, { error: "Bad event payload !" });
                return;
            }
            const event = parsedData.data;
            console.log("Broadcasting message event to room: " + socket.data.room._id);
            io.to(socket.data.room._id.toString()).emit(IoEvent.Message, data);
            // socket.emit(IoEvent.Message, data);
        });
        socket.on(IoEvent.Play, async (data) => {
            if (!socket.data.room) {
                socket.emit(IoEvent.Error, { error: "Please join a room before trying to send events !" });
                return;
            }
            const parsedData = PlayPauseEventSchema.safeParse(data);
            if (!parsedData.success) {
                socket.emit(IoEvent.Error, { error: "Bad event payload !" });
                return;
            }
            const event = parsedData.data;
            const room = await roomRepository.findOne({ _id: socket.data.room._id });
            // Prevent sending multiples times the same event because of some miliseconds of unsync
            if (room?.videoState.time === event.time && (room.videoState.updatedAt - event.updatedAt) < 5000 && room.videoState.state === "playing")
                return;
            roomRepository.updateOne({ _id: room._id }, { $set: { videoState: {
                        state: "playing",
                        time: event.time,
                        updatedAt: Date.now()
                    } } });
            socket.to(socket.data.room._id.toString()).emit(IoEvent.Play, {
                time: event.time,
                updatedAt: Date.now()
            });
        });
        socket.on(IoEvent.Pause, async (data) => {
            if (!socket.data.room) {
                socket.emit(IoEvent.Error, { error: "Please join a room before trying to send events !" });
                return;
            }
            const parsedData = PlayPauseEventSchema.safeParse(data);
            if (!parsedData.success) {
                socket.emit(IoEvent.Error, { error: "Bad event payload !" });
                return;
            }
            const event = parsedData.data;
            const room = await roomRepository.findOne({ _id: socket.data.room._id });
            if (room?.videoState.time === event.time && (room.videoState.updatedAt - event.updatedAt) < 5000 && room.videoState.state === "paused")
                return;
            roomRepository.updateOne({ _id: room._id }, { $set: { videoState: {
                        state: "paused",
                        time: event.time,
                        updatedAt: Date.now()
                    } } });
            socket.to(socket.data.room._id.toString()).emit(IoEvent.Pause, {
                time: event.time,
                updatedAt: Date.now()
            });
        });
    });
};
//# sourceMappingURL=rooms.socket.js.map