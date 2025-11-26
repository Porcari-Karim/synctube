import type { SessionData } from "express-session";
import { AsyncLocalStorage } from "node:async_hooks";
import type { Room } from "../rooms/rooms.model.js";

export interface WsStore {
    session: SessionData
    currentRoom: Room
}


export const wsContext = new AsyncLocalStorage<WsStore>();
