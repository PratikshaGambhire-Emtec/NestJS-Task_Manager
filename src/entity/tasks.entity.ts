/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
        import { type } from 'os';
import { TaskStatus } from 'src/tasks/tasks.enum';
        import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TaskEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type=> UserEntity, (user)=>user.tasks, { eager: false})
    user: UserEntity;

    @Column()
    userId: number;

}
