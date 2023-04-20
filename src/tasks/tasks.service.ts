import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;
        console.log('From Service', {status, search})
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(item => item.status === status);
        }
        if(search){
            tasks = tasks.filter(item => {
                return item.title.includes(search) || item.description.includes(search);
            })
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(item => item.id === id);
        if(!task){
            throw new NotFoundException(`Task with ID: "${id}" was not found!`);
        }
        return task;

    }

    // createTask(title: string, description: string): Task {
    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        this.getTaskById(id)
        this.tasks = this.tasks.filter(item => item.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const updatedTask = this.getTaskById(id);
        updatedTask.status = status;
        this.tasks = this.tasks.map(item => item.id !== id ? item : updatedTask);
        return updatedTask;
    }
}
