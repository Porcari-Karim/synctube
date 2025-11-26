import { context } from "../sessions/sessionAsyncLocalStorage.js"


export function Protected<T extends (...args: any[]) => any>(fn: T): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    const store = context.getStore();

    if (store?.session?.user) {
      return fn(...args);
    }

    throw new Error("Unauthorized");
  } as T;
}