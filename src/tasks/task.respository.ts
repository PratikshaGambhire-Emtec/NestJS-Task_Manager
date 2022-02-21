/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from "../entity/tasks.entity";
import { CreateTaskDTO } from './dto/create.task.dto';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './tasks.enum';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{
 async getTask(searchTaskDto: SearchTaskDTO){
    const { search, status } = searchTaskDto

    //select * from task where title like '%{search}%' or description '%{status}%'
    
    //create a query builder
    const query = this.createQueryBuilder('task')
    
    //search by status
    if(status){
        query.andWhere('task.status = :status', { status: status });

    }
    //search by title or description
    if(search){
        query.andWhere(
            `(task.title LIKE :search) OR (task.description LIKE :search)`,
            { search : `%${search}%` },
        );
    }

    //execute the query to get many records
    return await query.getMany();
 }
    // updateTask(){}

    async createTask(createTaskDto: CreateTaskDTO){
        //create a row in the Task table(TaskEntity)
        const task= new TaskEntity()
        task.title=createTaskDto.title;
        task.description=createTaskDto.description;
        task.status= TaskStatus.OPEN;

        //create a new row in the Task Table
        await task.save()

        return task;
    }
}
