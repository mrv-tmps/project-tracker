import { IsOptional } from 'class-validator';

import { ToDo } from '../entities/todo.entity';

export class GetToDoResponseDto {
  @IsOptional()
  readonly toDo: ToDo[];
}
