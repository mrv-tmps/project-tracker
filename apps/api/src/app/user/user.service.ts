import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Supabase } from './../supabase/supabase';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly supabase: Supabase,
  ) { }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  async createUserAccount(createUserDto: CreateUserDto) {
    Logger.log('Service -> Creating new Account Data: ', createUserDto);
    const { firebase_id, email } = createUserDto;
    Logger.log('-Firebase-ID', firebase_id);
    Logger.log('-Email', email);
    const { data, error } = await this.supabase.getClient().from('user')
      .insert({
        email,
        firebase_id,
      }).single();

    if (error) {
      throw error;
    }

    return data;

  }

  findAll() {
    return 'This action returns all user';
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
