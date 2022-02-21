import { UserEntity } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import * as crypto from 'crypto-js';
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    
    async signup(authcredentialsDto: AuthCredentialsDTO) {
      //  create a row for user table
        const user= new UserEntity()
        user.userName=authcredentialsDto.userName
        
        //encrypt the password
        user.userPassword= `${crypto.MD5(authcredentialsDto.userPassword)}`;
        
        //commit the row
        await user.save();
    }
   
    async signin(authcredentialsDto: AuthCredentialsDTO) {
        const {userName, userPassword}= authcredentialsDto;

        //find the user by user name
        const user = await this.findOne({ userName })
        console.log(user);

        //check if user exists
        if (user && user.validatePassword(userPassword)){
            return null;
        }
        return user;
    }
}