import { Router } from "express";
import { roomRouter } from "./rooms/rooms.controller.js";
import { fooRouter } from "./foo.router.js";
import { authRouter } from "./auth/auth.controller.js";

const router: Router = Router();

router.use("/rooms", roomRouter);
router.use("/foo", fooRouter);
router.use("/auth", authRouter);


export default router;