import { User } from '../auth/user.entity';
import { TimeStampEntity } from '../generics/timestamp.entities';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
    status: string;

    @CreateDateColumn({ update: false })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
    user: User;
}