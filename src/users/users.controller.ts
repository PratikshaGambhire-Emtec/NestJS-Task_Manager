import { Controller,Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { UserServices } from "./users.service";


@Controller('users')
export class UserController{

    constructor(private readonly userService: UserServices){

    }

    @Post('add')
    addUser(@Body('userName') name:string,@Body('userEmail') email:string, @Body('userPassword') password:string):any{
        this.userService.adduser(name,email,password);
        return 'User added successfully';
    }

    @Get('show')
    getUsers(){
        return this.userService.users;
    }

    @Get(':name')
    getuser(@Param ('name') name:string){
        return this.userService.getuser(name);
    }

    @Patch(':name')
    updateuserPass(@Param ('name') name:string, @Body ('userEmail') email:string,@Body('userPassword') password:string)
    {
        return this.userService.updateuserPass(name,email,password);
    }

    @Delete(':name')
    deleteUser(@Param ('name') name:string)
    {
        return this.userService.deleteUser(name);
    }
}