import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateToDoDto } from './dto/create-todo.dto';
import { GetToDoResponseDto } from './dto/get-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { ToDoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: ToDoService) { }

  @Post()
  create(@Body() createToDoDto: CreateToDoDto) {
    return this.todoService.createToDo(createToDoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  getToDoByTaskId(@Param('id') id: string): Promise<GetToDoResponseDto | any[]> {
    return this.todoService.getAllToDos(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateToDoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
