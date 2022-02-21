 /* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';
import * as crypto from 'crypto-js'

@Entity('User_entity')
@Unique(['userName'])
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    userName: string;

    // @Column()
    // userEmail: string;

    @Column()
    userPassword: string;   
    
     validatePassword(userPassword: string){
      const encrypted = `${crypto.MD5(userPassword)}`
      return encrypted == this.userPassword;
    }
  }