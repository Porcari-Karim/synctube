import type { SessionData } from "express-session";
import { AsyncLocalStorage } from "node:async_hooks";

export interface SessionStore {
    session: SessionData
}


const context = new AsyncLocalStorage<SessionStore>();

export {
    context
}