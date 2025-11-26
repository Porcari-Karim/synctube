import "express-session";
import type { WithId } from "mongodb";
import type { User } from "../auth/user.model";

declare module "socket.io" {
  interface IncomingMessage {
    session: SessionData 
  }
}