import {Injectable, NotFoundException} from '@nestjs/common';
import {TasksRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from './task.entity';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository) {
    }
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task | null>{
        const task = await this.tasksRepository.findOneBy({id: id});
        if(!task) {
            throw new NotFoundException(`Task with ID: "${id}" was not found!`);
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<string> {
        const result = await this.tasksRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID: "${id}" was not found!`);
        }
        return `Task with ID: "${id}" was deleted successfully`
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
