import { Controller,Post, Body,UseGuards, Get, Param, Patch, Delete, Query, ValidationPipe, UsePipes} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/entity/user.entity";
import { GetUser } from "src/users/get.user.decorator";
import { CreateTaskDTO } from "./dto/create.task.dto";
import { SearchTaskDTO } from "./dto/search.task.dto";
import { TaskStatus } from "./tasks.enum";
import { TaskService } from "./tasks.service";



@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    // dependency injection
    // TaskController is dependent on TaskService
    constructor(private taskService: TaskService) {}
  
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
      @GetUser() user: UserEntity,
      @Body() createTaskDto: CreateTaskDTO) {
      // 1. create a new task
      // 2. return all tasks
      return this.taskService.createTask(createTaskDto, user);
    }
  
    @Get()
    getTasks(@GetUser() user: UserEntity, @Query() searchTaskDto: SearchTaskDTO) {
      return this.taskService.getTasks(searchTaskDto, user);
    }
  
    @Patch('/:id/:status')
    updateTaskStatus(
      @GetUser() user: UserEntity,
      @Param('id') id: string,
      @Param('status') status: TaskStatus,
    ) {
      return this.taskService.updateTaskStatus(id, status);
    }
  
    @Delete('/:id')
    deleteTask(
      @GetUser() user: UserEntity,
      @Param('id') id: string) {
      return this.taskService.deleteTask(id);
    }

  }
  
  




























// export class TasksController{

//     constructor(private readonly taskService: TaskServices){

//     }

//     @Post('add')
//     addTask(@Body('taskName') taskName:string,@Body('taskStatus') taskStatus:string, @Body('username') username:string):any{
//         this.taskService.addTask(taskName,taskStatus,username);
//         return 'Task added successfully';
//     }

//     @Get('show')
//     getTasks(){
//         return this.taskService.tasks;
//     }

//     @Get(':name')
//     getTask(@Param ('name') tname:string){
//         return this.taskService.getTask(tname);
//     }

//     @Patch(':name')
//     updateTask(@Param ('name') tname:string, @Body ('taskStatus') tstatus:string,@Body('username') tuser:string)
//     {
//         return this.taskService.updateTaskStatus(tname,tstatus,tuser);
//     }

//     @Delete(':name')
//     deleteTask(@Param ('name') tname:string)
//     {
//         return this.taskService.deletetask(tname);
//     }
// }