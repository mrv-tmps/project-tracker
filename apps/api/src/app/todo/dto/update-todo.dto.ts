import { PartialType } from '@nestjs/swagger';

import { CreateToDoDto } from './create-todo.dto';

export class UpdateToDoDto extends PartialType(CreateToDoDto) { }
