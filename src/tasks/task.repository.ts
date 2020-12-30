import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks({ status, search, userId }: GetTaskFilterDto, user: User): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if(userId)
        query.where('task.user_id = :userId', { userId });

        if(status)
            query.where('task.status = :status', { status });

        if(search)
            query.orWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        
        const tasks = await query.getMany();

        return tasks;
    }

    async createTask({ title, description, status, userId }: CreateTaskDto, user: User): Promise<Task>{
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = status;
        task.userId = userId || user.id;
        await task.save();

        delete task.user;
        return task;
    }
}