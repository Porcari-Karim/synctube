import { Router, type Request, type Response } from "express";
import { roomService } from "./rooms.service.js";
import { CreateRoomDtoSchema, RoomDtoSchema, type RoomDto } from "shared";
import type { ObjectId } from "mongodb";

const roomRouter : Router = Router();

roomRouter.get("/", async (req : Request<{}, {}, {}, {search?: string}>, res: Response) => {
  console.log("GET /api/rooms called | ", req.query );
  const response = await roomService.getRooms(req.query.search ?? "");
  res.send(response);
});

roomRouter.get("/:id", async (req : Request<{id: string}, {}, {}, {}>, res: Response) => {
  const response = await roomService.getRoomById(req.params.id);
  res.send(response);
});


roomRouter.post("/", async (req: Request<{},{}, Omit<RoomDto, "_id">>, res: Response) => {
   await roomService.createRoom(CreateRoomDtoSchema.parse(req.body));
   res.sendStatus(201);
});

roomRouter.delete("/:roomId", async (req: Request<{roomId: string}, {},{}>, res: Response) => {
  const { roomId } = req.params;
   await roomService.deleteRoom(roomId);
   res.sendStatus(204);
});

export {roomRouter};