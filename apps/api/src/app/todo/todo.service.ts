import { Injectable, Logger } from '@nestjs/common';

import { Supabase } from '../supabase';

import { CreateToDoDto } from './dto/create-todo.dto';
import { GetToDoResponseDto } from './dto/get-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';

@Injectable()
export class ToDoService {
  constructor(
    private readonly supabase: Supabase,
  ) { }

  async createToDo(createToDoDto: CreateToDoDto) {
    Logger.log('-Description:', createToDoDto.description);
    Logger.log('-task_id:', createToDoDto.task_id);
    Logger.log('-is_done:', createToDoDto.is_done);

    const { data, error } = await this.supabase.getClient().from('todo').insert(createToDoDto).single();

    if (error) {
      throw error;
    }

    return data;
  }

  findAll() {
    return `This action returns all todo`;
  }

  async getAllToDos(id: string): Promise<GetToDoResponseDto | any[]> {
    Logger.log('-TaskID', id);
    const { data, error } = await this.supabase.getClient().from('todo').select().eq('task_id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateToDoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
