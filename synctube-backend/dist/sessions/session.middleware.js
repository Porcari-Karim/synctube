import MongoStore from "connect-mongo";
import session from "express-session";
import { context } from "./sessionAsyncLocalStorage.js";
if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
}
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}
const SESSION_TTL = 60 * 60 * 1; // 1 hour
const COOKIE_TTL = 1000 * SESSION_TTL;
const sessionHandler = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: COOKIE_TTL,
        secure: false,
        sameSite: "lax",
        httpOnly: true,
    },
    name: "synctube.sid",
    rolling: true,
    store: MongoStore.create({
        dbName: process.env.MONGODB_DB_NAME || "synctube",
        mongoUrl: process.env.MONGODB_URI,
        ttl: SESSION_TTL,
        autoRemove: 'native',
        touchAfter: 1
    })
});
const sessionMiddleware = (req, res, next) => {
    sessionHandler(req, res, () => {
        req.session.visits = (req.session.visits || 0) + 1;
        context.run({ session: req.session }, () => {
            // console.log(`Session ID: ${req.sessionID}`);
            // res.send(req.session.cookie);
            next();
            // console.log(req.session);
        });
    });
};
export { sessionMiddleware };
//# sourceMappingURL=session.middleware.js.map