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
    const { created_by, is_active, name } = createProjectDto;
    Logger.log('-Project Name', name);
    Logger.log('-is_active', is_active);
    Logger.log('-created_by', created_by);
    const { data, error } = await this.supabase.getClient().from('project').insert({
      created_by,
      is_active,
      name,
    }).single();

    if (error) {
      throw error;
    }

    return data;
  }

  async getAllUserProjects(id: string): Promise<GetProjectResponseDto | any[]> {
    Logger.log('-UserID', id);
    const { data, error } = await this.supabase.getClient().from('project').select().eq('created_by', id);

    if (error) {
      throw error;
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
