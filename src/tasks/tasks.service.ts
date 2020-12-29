import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from '../tasks/dto/get-task-filter.dto';
import { TaskRepository } from './task.repository'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository){}

    getTasks(getTaskFilterDto: GetTaskFilterDto, user: User){ 
        return this.taskRepository.getTasks(getTaskFilterDto, user);   
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found)
            throw new NotFoundException(`Task with ${id} not found.`);
        return found;
    }

    async deleteTask(id: number): Promise<void>{
        const result = await this.taskRepository.softDelete(id);
        if(result.affected === 0)
            throw new NotFoundException(`Task with ${id} not found.`);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>{
        let found = await this.getTaskById(id);
        Object.assign(found, updateTaskDto);
        return await found.save();
    }
}
