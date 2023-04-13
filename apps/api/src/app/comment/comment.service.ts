import { Injectable, Logger } from '@nestjs/common';

import { Supabase } from '../supabase';

import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentResponseDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly supabase: Supabase,
  ) { }

  async createComment(createCommentDto: CreateCommentDto) {
    Logger.log('-Description:', createCommentDto.description);
    Logger.log('-task_id:', createCommentDto.task_id);
    Logger.log('-commenter_user_id:', createCommentDto.commenter_user_id);

    const { data, error } = await this.supabase.getClient().from('comment').insert(createCommentDto).single();

    if (error) {
      throw error;
    }

    return data;
  }

  findAll() {
    return 'This action returns all comment';
  }

  async getAllComments(id: string): Promise<GetCommentResponseDto | any[]> {
    Logger.log('-TaskID', id);
    const { data, error } = await this.supabase.getClient().from('comment').select().eq('task_id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
