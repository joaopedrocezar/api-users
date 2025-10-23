import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { DatabaseInterface } from './database.interface';
import { Database2Service } from './database2.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, { provide: DatabaseInterface, useClass: Database2Service }],
})
export class AppModule {}
