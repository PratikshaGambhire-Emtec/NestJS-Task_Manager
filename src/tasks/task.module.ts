/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/users.module";
import { TaskRepository } from "./task.respository";
import { TaskController } from "./tasks.controller";
import { TaskService } from "./tasks.service";

@Module({

    //use typeorm to create the table task using repo
    imports:[TypeOrmModule.forFeature([TaskRepository]), UserModule ],
    controllers:[TaskController],
    providers:[TaskService ],

})

export class TaskModule{}
