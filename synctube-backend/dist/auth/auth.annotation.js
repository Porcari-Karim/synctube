import { context } from "../sessions/sessionAsyncLocalStorage.js";
export function Protected(fn) {
    return function (...args) {
        const store = context.getStore();
        if (store?.session?.user) {
            return fn(...args);
        }
        throw new Error("Unauthorized");
    };
}
//# sourceMappingURL=auth.annotation.js.map