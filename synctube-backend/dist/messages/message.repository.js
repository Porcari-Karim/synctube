import {} from "./message.model.js";
import { database } from "../database.js";
const collections = await database.collections();
if (!collections.find(col => col.collectionName === "messages")) {
    await database.createCollection("messages");
    console.log("Created 'messages' collection in the database.");
}
const messageRepository = database.collection("messages");
export { messageRepository };
//# sourceMappingURL=message.repository.js.map