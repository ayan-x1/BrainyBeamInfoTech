import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from '../config/database.js';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  private static collection: Collection<IUser>;

  static getCollection(): Collection<IUser> {
    if (!this.collection) {
      const db = getDatabase();
      this.collection = db.collection<IUser>('users');
    }
    return this.collection;
  }

  static async create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const collection = this.getCollection();
    const now = new Date();
    const user: IUser = {
      ...userData,
      role: userData.role || 'user', // Default role is 'user'
      createdAt: now,
      updatedAt: now
    };
    
    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const collection = this.getCollection();
    return await collection.findOne({ email: email.toLowerCase().trim() });
  }

  static async findById(id: string | ObjectId): Promise<IUser | null> {
    const collection = this.getCollection();
    
    // Validate ObjectId if it's a string
    if (typeof id === 'string' && !ObjectId.isValid(id)) {
      return null;
    }
    
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async updateById(id: string | ObjectId, updateData: Partial<Omit<IUser, '_id' | 'createdAt'>>): Promise<IUser | null> {
    const collection = this.getCollection();
    
    // Validate ObjectId if it's a string
    if (typeof id === 'string' && !ObjectId.isValid(id)) {
      return null;
    }
    
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );

    return result;
  }

  static async deleteById(id: string | ObjectId): Promise<boolean> {
    const collection = this.getCollection();
    
    // Validate ObjectId if it's a string
    if (typeof id === 'string' && !ObjectId.isValid(id)) {
      return false;
    }
    
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  static async createIndexes(): Promise<void> {
    const collection = this.getCollection();
    
    // Create unique index on email
    await collection.createIndex({ email: 1 }, { unique: true });
    
    // Create index for better query performance
    await collection.createIndex({ email: 1 });
  }
}

export default UserModel;