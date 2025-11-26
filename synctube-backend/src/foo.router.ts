import type { Request, Response } from "express";
import { context } from "./sessions/sessionAsyncLocalStorage.js";


export const fooRouter = async (req: Request, res: Response) => {
    
    res.send("foo");
    console.log("foo endpoint hit");
    console.log(context.getStore()?.session.visits);

}