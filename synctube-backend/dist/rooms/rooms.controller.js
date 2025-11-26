import { Router } from "express";
import { roomService } from "./rooms.service.js";
import { CreateRoomDtoSchema, RoomDtoSchema } from "shared";
const roomRouter = Router();
roomRouter.get("/", async (req, res) => {
    console.log("GET /api/rooms called | ", req.query);
    const response = await roomService.getRooms(req.query.search ?? "");
    res.send(response);
});
roomRouter.get("/:id", async (req, res) => {
    const response = await roomService.getRoomById(req.params.id);
    res.send(response);
});
roomRouter.post("/", async (req, res) => {
    await roomService.createRoom(CreateRoomDtoSchema.parse(req.body));
    res.sendStatus(201);
});
roomRouter.delete("/:roomId", async (req, res) => {
    const { roomId } = req.params;
    await roomService.deleteRoom(roomId);
    res.sendStatus(204);
});
export { roomRouter };
//# sourceMappingURL=rooms.controller.js.map