/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
        import { TaskStatus } from 'src/tasks/tasks.enum';
        import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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


}
