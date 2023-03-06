import { IsOptional } from 'class-validator';

import { Task } from '../entities/task.entity';

export class GetTaskResponseDto {
  @IsOptional()
  readonly task: Task[];
}
