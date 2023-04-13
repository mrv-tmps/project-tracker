import { IsOptional } from 'class-validator';

import { Comment } from '../entities/comment.entity';

export class GetCommentResponseDto {
  @IsOptional()
  readonly comment: Comment[];
}
