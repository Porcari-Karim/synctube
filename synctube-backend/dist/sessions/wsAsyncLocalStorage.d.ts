import type { SessionData } from "express-session";
import { AsyncLocalStorage } from "node:async_hooks";
import type { Room } from "../rooms/rooms.model.js";
export interface WsStore {
    session: SessionData;
    currentRoom: Room;
}
export declare const wsContext: AsyncLocalStorage<WsStore>;
//# sourceMappingURL=wsAsyncLocalStorage.d.ts.map