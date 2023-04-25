import {Body, Controller, Get, Post, Param, Delete, Patch, Query, Inject} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from './task.entity';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(
        @Inject(TasksService)
        private tasksService: TasksService
    ) {}

    @Get()                                                                                                              //http://localhost:3000/tasks?status=OPEN&search=some-search-string
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }


    @Get('/:id')                                                                                                   //http://localhost:3000/tasks/some-id-of-the-task
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }


    @Post()                                                                                                             //http://localhost:3000/tasks
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    //
    @Delete('/:id')                                                                                                //http://localhost:3000/tasks/some-id-of-the-task
    deleteTask(@Param('id') id: string): Promise<string> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')                                                                                          //http://localhost:3000/tasks/some-id-of-the-task/status
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status)
    }

}
