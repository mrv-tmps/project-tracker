import { randomUUID } from 'crypto';

import { Injectable, Logger } from '@nestjs/common';

import { Supabase } from '../supabase';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskResponseDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly supabase: Supabase,
  ) { }

  async createProjectTask(createTaskDto: CreateTaskDto) {
    Logger.log('-Name:', createTaskDto.name);
    Logger.log('-due_date:', createTaskDto.due_date);

    const { data, error } = await this.supabase.getClient().from('task').insert(createTaskDto).single();

    if (error) {
      throw error;
    }

    return data;
  }

  async getAllProjectTasks(id: string): Promise<GetTaskResponseDto | any[]> {
    Logger.log('-UserID', id);
    const { data, error } = await this.supabase.getClient().from('task').select().eq('project_id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
