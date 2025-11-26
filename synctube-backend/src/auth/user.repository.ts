import { database } from "../database.js";
import type { User } from "./user.model.js";

const collections = await database.collections();
if(!collections.find(col => col.collectionName === "users")) {
    await database.createCollection("users");
    console.log("Created 'users' collection in the database.");
}

const userRepository = database.collection<User>("users");

export { userRepository };