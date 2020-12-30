import { IsDefined, IsString, IsNotEmpty, IsIn, IsOptional, IsNumber } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

const ALLOWED_STATUSES = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

export class CreateTaskDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(ALLOWED_STATUSES)
    status: string = ALLOWED_STATUSES[0];

    @IsOptional()
    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}