import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection string - Replace with your actual credentials
const uri = process.env.MONGO_URI || "mongodb+srv://<db_user>:<db_password>@cluster0.8cuxpaa.mongodb.net/?retryWrites=true&w=majority&appName=<app_name>";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    
    // Get the database instance
    db = client.db(process.env.DB_NAME || 'secure-dash');
    
    // Create indexes for better performance
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

const createIndexes = async (): Promise<void> => {
  try {
    const usersCollection = db.collection('users');
    
    // Create unique index on email
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ Created unique index on email field');
    
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await client.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};
