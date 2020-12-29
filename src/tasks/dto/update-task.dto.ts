import { IsDefined, IsString, IsNotEmpty,IsIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

const ALLOWED_STATUSES = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

export class UpdateTaskDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsIn(ALLOWED_STATUSES)
    status: string;
}