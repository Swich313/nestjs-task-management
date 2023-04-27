import {Body, Controller, Get, Post, Param, Delete, Patch, Query, Inject, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from './task.entity';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(
        @Inject(TasksService)
        private tasksService: TasksService
    ) {}

    @Get()                                                                                                              //http://localhost:3000/tasks?status=OPEN&search=some-search-string
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user)
    }


    @Get('/:id')                                                                                                   //http://localhost:3000/tasks/some-id-of-the-task
    async getTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }


    @Post()                                                                                                             //http://localhost:3000/tasks
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }
    //
    @Delete('/:id')                                                                                                //http://localhost:3000/tasks/some-id-of-the-task
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<string> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')                                                                                          //http://localhost:3000/tasks/some-id-of-the-task/status
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User
    ): Promise<Task> {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user)
    }

}
