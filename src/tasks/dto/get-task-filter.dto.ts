import { Transform } from 'class-transformer';
import { IsOptional, IsIn, IsDefined, IsString, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

const ALLOWED_STATUSES = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

export class GetTaskFilterDto {
    @IsOptional()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsIn(ALLOWED_STATUSES)
    status: string;

    @IsOptional()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @Transform(parseInt)
    userId: string;
}