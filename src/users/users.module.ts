import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";
import { UserController } from "./users.controller";
import { User } from "./users.model";
import { UserRepository } from "./users.repository";
import { UserServices } from "./users.service";

@Module({
    imports: [
        //for JWT
        JwtModule.register({
            secret: 'secret',
            signOptions:{
                expiresIn:3600,
            },
        }),
        //for passport
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),


        //for TypeORM dependency
        TypeOrmModule.forFeature([UserRepository])],
    controllers:[UserController],
    providers:[UserServices, JwtStrategy],
    //to use these providers in the TaskModule
    exports: [JwtStrategy, PassportModule],
})

export class UserModule{}