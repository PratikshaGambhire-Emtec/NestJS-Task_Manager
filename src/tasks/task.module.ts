import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TaskServices } from "./tasks.service";

@Module({
    controllers:[TasksController],
    providers:[TaskServices],

})

export class TaskModule{}