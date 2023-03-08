import { Injectable, Logger } from '@nestjs/common';

import { Supabase } from '../supabase';

import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectResponseDto } from './dto/get-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly supabase: Supabase,
  ) { }

  async createUserProject(createProjectDto: CreateProjectDto) {
    const { data, error } = await this.supabase.getClient().from('project').insert(createProjectDto).single();

    if (error) {
      throw error;
    }

    return data;
  }

  async getAllUserProjects() {
    const { data, error } = await this.supabase.getClient().from('project').select();

    if (error) {
      throw error;
    }

    return data;
  }

  async findOne(id: string) {
    Logger.log('-ProjectID', id);
    const { data, error } = await this.supabase.getClient().from('project').select('*, task(*)').eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
