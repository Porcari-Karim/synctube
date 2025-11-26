import "express-session";
import type { WithId } from "mongodb";
import type { User } from "../auth/user.model";

declare module "express-session" {
  interface SessionData {
    visits?: number;
    user?: WithId<User>;
  }
}