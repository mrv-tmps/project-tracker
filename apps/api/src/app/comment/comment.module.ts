import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  imports: [
    SupabaseModule,
  ],
  providers: [CommentService]
})
export class CommentModule { }
