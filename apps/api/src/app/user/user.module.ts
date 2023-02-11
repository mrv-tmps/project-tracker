import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SupabaseModule } from './../supabase/supabase.module';

import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    SupabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService]
})
export class UserModule { }
