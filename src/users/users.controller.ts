import { Controller,Post, Body, Get, Param, Patch, Delete, ValidationPipe, UsePipes, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { resourceUsage } from "process";
import { UserEntity } from "src/entity/user.entity";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import { GetUser } from "./get.user.decorator";
import { UserServices } from "./users.service";


@Controller('users')
export class UserController{  

    constructor(
        private userService: UserServices){}

    @Get('/profile')
    @UseGuards(AuthGuard())
    getProfile(@GetUser() user: UserEntity) {
        return user;
      

    }


@Post('/signup')    
@UsePipes(ValidationPipe)
signup(@Body() authcredentialsDto:  AuthCredentialsDTO){
  return this.userService.signup(authcredentialsDto)  
}

@Post('/signin')
@UsePipes(ValidationPipe)
signin(@Body() authcredentialsDto:  AuthCredentialsDTO){
    return this.userService.signin(authcredentialsDto)
 }
}























// export class UserController{

//     constructor(private readonly userService: UserServices){

//     }

//     @Post('add')
//     addUser(@Body('userName') name:string,@Body('userEmail') email:string, @Body('userPassword') password:string):any{
//         this.userService.adduser(name,email,password);
//         return 'User added successfully';
//     }

//     @Get('show')
//     getUsers(){
//         return this.userService.users;
//     }

//     @Get(':name')
//     getuser(@Param ('name') name:string){
//         return this.userService.getuser(name);
//     }

//     @Patch(':name')
//     updateuserPass(@Param ('name') name:string, @Body ('userEmail') email:string,@Body('userPassword') password:string)
//     {
//         return this.userService.updateuserPass(name,email,password);
//     }

//     @Delete(':name')
//     deleteUser(@Param ('name') name:string)
//     {
//         return this.userService.deleteUser(name);
//     }
// }