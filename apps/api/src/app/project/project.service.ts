import { Injectable, Logger } from '@nestjs/common';

import { Supabase } from '../supabase';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly supabase: Supabase,
  ) { }

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async getAllUserProjects(id: string) {
    Logger.log('-UserID', id);
    const { data, error } = await this.supabase.getClient().from('project').select().is('created_by', id);

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
