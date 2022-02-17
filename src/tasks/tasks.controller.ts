import { Controller,Post, Body, Get, Param, Patch} from "@nestjs/common";
import { TaskServices } from "./tasks.service";


@Controller('tasks')
export class TasksController{

    constructor(private readonly taskService: TaskServices){

    }

    @Post('add')
    addTask(@Body('taskName') taskName:string,@Body('taskStatus') taskStatus:string, @Body('username') username:string):any{
        this.taskService.addTask(taskName,taskStatus,username);
        return 'Task added successfully';
    }

    @Get('show')
    getTasks(){
        return this.taskService.tasks;
    }

    @Get(':name')
    getTask(@Param ('name') tname:string){
        return this.taskService.getTask(tname);
    }

    @Patch(':name')
    updateTask(@Param ('name') tname:string, @Body ('taskStatus') tstatus:string,@Body('username') tuser:string)
    {
        return this.taskService.updateTaskStatus(tname,tstatus,tuser);
    }
}