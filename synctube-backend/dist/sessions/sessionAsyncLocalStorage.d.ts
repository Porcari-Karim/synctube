import type { SessionData } from "express-session";
import { AsyncLocalStorage } from "node:async_hooks";
export interface SessionStore {
    session: SessionData;
}
declare const context: AsyncLocalStorage<SessionStore>;
export { context };
//# sourceMappingURL=sessionAsyncLocalStorage.d.ts.map