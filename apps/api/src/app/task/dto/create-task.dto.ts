import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly due_date: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly created_by: string;

  @IsString()
  readonly status: string;

  @IsString()
  readonly assignee_id: string;

  @IsString()
  readonly project_id: string;
}
