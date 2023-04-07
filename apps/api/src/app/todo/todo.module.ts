import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase';

import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';

@Module({
  controllers: [ToDoController],
  imports: [
    SupabaseModule,
  ],
  providers: [ToDoService]
})
export class ToDoModule { }
