import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URI as string;
const dbName = 'USERDATA'; // ✅ updated
const collectionName = 'PORTFOLIO'; // ✅ updated

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please define MONGO_URI in .env.local');
}

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}
clientPromise = globalWithMongo._mongoClientPromise;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName); // ✅ USERDATA
    const collection = db.collection(collectionName); // ✅ PORTFOLIO

    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}
