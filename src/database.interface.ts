import { Injectable } from '@nestjs/common';

@Injectable()

export abstract class DatabaseInterface {
  abstract createUser(name: string, email: string): Promise<any>;
  abstract getAllUsers(): Promise<any[]>;
}