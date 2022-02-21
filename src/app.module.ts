/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfiguration } from './config/typeorm.config';
import { TaskModule } from './tasks/task.module';
import { UserController } from './users/users.controller';
import { UserModule } from './users/users.module';
import { UserServices } from './users/users.service';

@Module({
  imports: [
    TaskModule,
    UserModule,

    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeORMConfiguration),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
