import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.model';
import { TaskService } from './task.service';


@Controller('task')
export class TaskController {
  // dependency injection
  // TaskController is dependent on TaskService
  constructor(private taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    // 1. create a new task
    // 2. return all tasks
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() searchTaskDto: SearchTaskDTO) {
    return this.taskService.getTasks(searchTaskDto);
  }

  @Patch('/:id/:status')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}

