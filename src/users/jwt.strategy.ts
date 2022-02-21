import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt.payload";
import { UserRepository } from "./users.repository";

export class JwtStrategy extends PassportStrategy(Strategy){
  
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        //get the token from invoming request and
        // validate it using secret
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        })

    }

   async validate(payload: JwtPayload){
        //get the user id or username from the payload
        const user= this.userRepository.findOne({ id: payload.id });

        //if user does not exists throw 401
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}