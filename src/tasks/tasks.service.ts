import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TaskServices{
    tasks:Task[]=[];

    addTask(taskName:string, taskStatus:string, username:string) {
        const newTask= new Task(taskName,taskStatus,username);
        this.tasks.push(newTask);
    }

    getTask(tName:string){
        const targetTask=this.tasks.find((tas) => tas.name === tName);
        if(!targetTask){
            return 'No such task found';
        }
        return {...targetTask};
    }
    
    updateTaskStatus(tname:string, tstatus:string,tuser:string)
    {
        const targetTask=this.tasks.find((tas)=> tas.name===tname);
        if(!targetTask)
        {
            return 'No such task found'
        }
        targetTask.status=tstatus;
        targetTask.taskStatus=tstatus;
        targetTask.user=tuser;
        targetTask.username=tuser;
        return {...targetTask};
    }

    deletetask(tname:string)
    {
        const targetTask=this.tasks.find((tas) => tas.taskName === tname);
        if(!targetTask){
            return 'No such task found';
        }
        else{
            var arr=this.tasks
            this.tasks=this.tasks.filter(function(task,index, arr){
                return task!=targetTask;
            })
            return 'Task deleted successfully';
        }
    }
}