import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Project } from './project/entities/project.entity';
import { ProjectModule } from './project/project.module';
import { SupabaseModule } from './supabase';
import { TaskModule } from './task/task.module';
import { ToDoModule } from './todo/todo.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SupabaseModule,
    ProjectModule,
    TaskModule,
    ToDoModule,
  ],
  providers: [AppService],
})
export class AppModule { }
