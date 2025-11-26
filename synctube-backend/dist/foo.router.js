import { context } from "./sessions/sessionAsyncLocalStorage.js";
export const fooRouter = async (req, res) => {
    res.send("foo");
    console.log("foo endpoint hit");
    console.log(context.getStore()?.session.visits);
};
//# sourceMappingURL=foo.router.js.map