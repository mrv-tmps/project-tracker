import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskResponseDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createProjectTask(createTaskDto);
  }

  @Get(':id')
  getTasksByProjectId(@Param('id') id: string): Promise<GetTaskResponseDto | any[]> {
    return this.taskService.getAllProjectTasks(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
