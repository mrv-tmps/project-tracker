import { IsBoolean, IsString } from 'class-validator';

export class CreateToDoDto {
  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly is_done: boolean;

  @IsString()
  readonly task_id: string;
}
