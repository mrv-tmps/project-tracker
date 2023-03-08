import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectResponseDto } from './dto/get-project.dto';

import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  createNewProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createUserProject(createProjectDto);
  }

  @Get()
  getAllProjects() {
    return this.projectService.getAllUserProjects();
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
