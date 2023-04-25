import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
// import {TasksRepository} from "./task.repository";
import {Task} from './task.entity';
import {TasksRepository} from "./task.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Task, TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TypeOrmModule]
})
export class TasksModule {}
