import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://mongo:d5uffs6yiv068lka@77.37.125.28:27016';

const dbName = process.env.MONGODB_DB_NAME || 'synctube';

const client = new MongoClient(uri);

const database = client.db(dbName);

await database.client.connect().then(() => {
  console.log('Connected to MongoDB');
})

export { database, client };