import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: { name: string; email: string }) {
    try {
      const { name, email } = createUserDto;

      if (!name || !email) {
        throw new HttpException(
          'Nome e email são obrigatórios',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.databaseService.createUser(name, email);

      return {
        message: 'Usuário criado com sucesso',
        user,
      };
    } catch (error) {
      if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new HttpException('Email já está em uso', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers() {
    try {
      const users = await this.databaseService.getAllUsers();
      return {
        message: 'Usuários encontrados',
        users,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
