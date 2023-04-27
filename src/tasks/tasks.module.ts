import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from './task.entity';
import {TasksRepository} from "./tasks.repository";
import {AuthModule} from "../auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [TypeOrmModule.forFeature([Task, TasksRepository, AuthModule])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TypeOrmModule]
})
export class TasksModule {}
