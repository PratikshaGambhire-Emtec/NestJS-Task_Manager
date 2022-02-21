 /* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from 'typeorm';
import * as crypto from 'crypto-js'
import { TaskEntity } from './tasks.entity';

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
    
    //one user may have multiple tasks
    @OneToMany(type => TaskEntity, task => task.user, {eager: true})
    tasks: TaskEntity[];

     validatePassword(userPassword: string){
      const encrypted = `${crypto.MD5(userPassword)}`
      return encrypted == this.userPassword;
    }
  }