import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { UserController } from './users/users.controller';
import { UserModule } from './users/users.module';
import { UserServices } from './users/users.service';

@Module({
  imports: [TaskModule,UserModule],
  controllers: [AppController,UserController],
  providers: [AppService,UserServices],
})
export class AppModule {}