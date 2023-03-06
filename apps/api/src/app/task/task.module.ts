import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [
    SupabaseModule,
  ],
  providers: [TaskService]
})
export class TaskModule { }
