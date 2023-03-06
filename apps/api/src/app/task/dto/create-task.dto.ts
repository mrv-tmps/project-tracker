import { IsString } from 'class-validator';
import TaskStatus from 'libs/enums/src/lib/Status';

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly created_by: string;

  @IsString()
  readonly status: TaskStatus;

  @IsString()
  readonly assignee_id: string;

  @IsString()
  readonly project_id: string;
}
