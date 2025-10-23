import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { DatabaseInterface } from './database.interface';

@Injectable()
export class Database2Service implements DatabaseInterface {

  private async createUsersTable(): Promise<void> {
    
  }

  async createUser(name: string, email: string): Promise<{ id: number; name: string; email: string; created_at: string }> {
    console.log('Creating user in database');
    return { id: 1, name, email, created_at: new Date().toISOString() };
  }

  async getAllUsers(): Promise<any[]> {
    console.log('Fetched all users from database');
    return [];
  }

  async closeDatabase(): Promise<void> {

  }
}
