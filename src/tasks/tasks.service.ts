import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDTO } from "./dto/create.task.dto";
import { SearchTaskDTO } from "./dto/search.task.dto";
import { TaskRepository } from "./task.respository";
//import { Task } from "./task.model";
import { TaskStatus } from "./tasks.enum";


@Injectable()
export class TaskService {
  
    constructor(
        //add the dependency for TaskRepository
        @InjectRepository(TaskRepository)
        private taskrepository: TaskRepository
    ){} 
       
    // return tasks
   async getTasks(searchTaskDto: SearchTaskDTO) {
     return this.taskrepository.getTask(searchTaskDto)
    }
  
    // create a new task
    async createTask(createTaskDto: CreateTaskDTO) {

        //get a new row created for the task
        return this.taskrepository.createTask(createTaskDto)
    }

   async getTaskById(id: string){
      //select * from Task where id = {id}
      const task= await this.taskrepository.findOne(id); 
        if(!task){
          throw new NotFoundException('task not found');

        }
        return task;
      }
   async updateTaskStatus(id: string, status: TaskStatus) {
    //find the task by id  
    const task= await this.getTaskById(id)
    
    task.status= status

    //save the changes
    await task.save();

    return task;
  }
  
    async deleteTask(id: string) {

      //try deleting the with id
      const result=await this.taskrepository.delete(id)
      
      //if affected rows are > 0 -> success
      if(result.affected==0){
        throw new NotFoundException('Task not found')
      }

      return result;
    }
  }






























// function createTask(createTaskDto: any, CreateTaskDTO: typeof CreateTaskDTO) {
//     throw new Error("Function not implemented.");
// }
// export class TaskServices{
//     tasks:Task[]=[];

//     addTask(taskName:string, taskStatus:string, username:string) {
//         const newTask= new Task(taskName,taskStatus,username);
//         this.tasks.push(newTask);
//     }
    

//     getTask(tName:string){
//         const targetTask=this.tasks.find((tas) => tas.name === tName);
//         if(!targetTask){
//             return 'No such task found';
//         }
//         return {...targetTask};
//     }
    
//     updateTaskStatus(tname:string, tstatus:string,tuser:string)
//     {
//         const targetTask=this.tasks.find((tas)=> tas.name===tname);
//         if(!targetTask)
//         {
//             return 'No such task found'
//         }
//         targetTask.status=tstatus;
//         targetTask.taskStatus=tstatus;
//         targetTask.user=tuser;
//         targetTask.username=tuser;
//         return {...targetTask};
//     }

//     deletetask(tname:string)
//     {
//         const targetTask=this.tasks.find((tas) => tas.taskName === tname);
//         if(!targetTask){
//             return 'No such task found';
//         }
//         else{
//             var arr=this.tasks
//             this.tasks=this.tasks.filter(function(task,index, arr){
//                 return task!=targetTask;
//             })
//             return 'Task deleted successfully';
//         }
//     }
// }