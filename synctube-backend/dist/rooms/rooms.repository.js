import { database } from "../database.js";
const collections = await database.collections();
console.log("Existing collections in the database:", collections.map(col => col.collectionName));
if (!collections.find(col => col.collectionName === "rooms")) {
    await database.createCollection("rooms");
    console.log("Created 'rooms' collection in the database.");
}
const roomRepository = database.collection("rooms");
export { roomRepository };
//# sourceMappingURL=rooms.repository.js.map