import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: sqlite3.Database;

  async onModuleInit() {
    await this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database('./users.db', (err) => {
        if (err) {
          console.error('Erro ao conectar com o banco de dados:', err);
          reject(err);
        } else {
          console.log('Conectado ao banco SQLite');
          this.createUsersTable().then(resolve).catch(reject);
        }
      });
    });
  }

  private async createUsersTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;

      this.db.run(createTableQuery, (err) => {
        if (err) {
          console.error('Erro ao criar tabela users:', err);
          reject(err);
        } else {
          console.log('Tabela users criada/verificada com sucesso');
          resolve();
        }
      });
    });
  }

  async createUser(name: string, email: string): Promise<{ id: number; name: string; email: string; created_at: string }> {
    return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

      const self = this;
      
      this.db.run(insertQuery, [name, email], function(err) {
        if (err) {
          reject(err);
        } else {
          // Buscar o usuário criado
          const selectQuery = 'SELECT * FROM users WHERE id = ?';
          self.db.get(selectQuery, [this.lastID], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row as any);
            }
          });
        }
      });
    });
  }

  async getAllUsers(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM users ORDER BY created_at DESC';
      
      this.db.all(selectQuery, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getUserById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM users WHERE id = ?';
      
      this.db.get(selectQuery, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async closeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Conexão com banco de dados fechada');
          resolve();
        }
      });
    });
  }
}
