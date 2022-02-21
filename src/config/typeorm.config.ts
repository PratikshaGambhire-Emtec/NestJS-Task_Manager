/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entity/tasks.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Entity } from 'typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: '705750',
  port: 3305,
  host: 'localhost',
  type: 'mysql',
  database: 'new',
  
  entities: [Entity, TaskEntity, UserEntity],
  synchronize: false,
};
