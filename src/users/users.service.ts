import { Injectable } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UserServices{
    users:User[]=[];

    adduser(name:string, email:string, password:string) {
        const newuser= new User(name,email,password);
        this.users.push(newuser);
    }


    getuser(name:string){
        const targetuser=this.users.find((tuser) => tuser.name === name);
        if(!targetuser){
            return 'No such user found';
        }
        return {...targetuser};
    }
    
    updateuserPass(name:string, email:string, password:string)
    {
        const targetuser=this.users.find((tuser)=> tuser.name===name);
        if(!targetuser)
        {
            return 'No such user found';
        }
        if(targetuser.email===email)
        {
            targetuser.userPassword=password;
            targetuser.password=password;
            return 'Password successfully Updated';
        }
        else{
            return 'Wrong details provided';
        }
    }

    deleteUser(name:string){
        const targetTask=this.users.find((tuser) => tuser.name === name);
        if(!targetTask){
            return 'No such task found';
        }
        else{
            var arr=this.users
            this.users=this.users.filter(function(user,index, arr){
                return user!=targetTask;
            })
            return 'Task deleted successfully';
        }
    }
}