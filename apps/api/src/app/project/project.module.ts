import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  imports: [
    SupabaseModule,
  ],
  providers: [ProjectService]
})
export class ProjectModule { }
