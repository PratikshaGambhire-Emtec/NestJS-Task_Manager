import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from './task.model';

//import the uuid to generate new id for task
import * as uuid from 'uuid';
import { SearchTaskDTO } from './dto/search.task.dto';

@Injectable()
export class TaskService {
  // store all the tasks
  private tasks: Task[] = [];

  // return tasks
  getTasks(searchTaskDto: SearchTaskDTO) {
    // get the search parameter and status value
    const { search, status } = searchTaskDto;

    // start with all tasks
    let tasks = this.tasks;

    // if user has passed any search criteria
    // search the tasks matching with the search text
    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    // if user is looking for only certain tasks matching with status
    if (status) {
      tasks = tasks.filter((task) => {
        return task.status == status;
      });
    }

    // return the filtered task
    return tasks;
  }

  // create a new task
  createTask(createTaskDto: CreateTaskDTO) {
    // generate new id
    const newId = uuid.v1();

    // create a new task
    const task: Task = {
      id: newId,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };

    // add this task to the tasks list
    this.tasks.push(task);

    return this.tasks;
  }

  private getTaskById(id: string) {
    // find the task to update the status
    const task = this.tasks.find((task) => {
      return task.id == id;
    });

    // if task with the id is not found
    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    // find the task by id
    const task = this.getTaskById(id);

    // update the status
    task.status = status;

    // return the task
    return task;
  }

  deleteTask(id: string) {
    // check if the task exists
    this.getTaskById(id);

    // delete the task matching id
    // select all of those tasks which are not having id matching to this task
    this.tasks = this.tasks.filter((task) => task.id != id);

    return this.tasks;
  }
}