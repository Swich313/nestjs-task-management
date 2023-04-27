import {Injectable, NotFoundException} from '@nestjs/common';
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from './task.entity';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository) {
    }
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task>{
        const task = await this.tasksRepository.findOneBy({id, user});
        if(!task) {
            throw new NotFoundException(`Task with ID: "${id}" was not found!`);
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<string> {
        const result = await this.tasksRepository.delete({id, user});
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID: "${id}" was not found!`);
        }
        return `Task with ID: "${id}" was deleted successfully`
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
