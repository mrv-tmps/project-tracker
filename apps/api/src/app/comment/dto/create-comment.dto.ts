import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly description: string;

  @IsString()
  readonly task_id: string;

  @IsString()
  readonly commenter_user_id: string;
}
