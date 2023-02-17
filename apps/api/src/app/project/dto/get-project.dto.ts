import { Project } from '@project-tracker/types';
import { IsOptional } from 'class-validator';

export class GetProjectResponseDto {
  @IsOptional()
  readonly project: Project[];
}
