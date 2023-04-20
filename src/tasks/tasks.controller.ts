import {Body, Controller, Get, Post, Param, Delete, Patch, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task, TaskStatus} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()                                                                                                              //http://localhost:3000/tasks?status=OPEN&search=some-search-string
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        console.log({filterDto})
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')                                                                                                   //http://localhost:3000/tasks/some-id-of-the-task
    getTaskById(@Param('id') id: string): Task{
        console.log({id})
        return this.tasksService.getTaskById(id);
    }

    @Post()                                                                                                             //http://localhost:3000/tasks
    // createTask(@Body('title') title: string, @Body('description') description: string): Task {                       //extract exact fields from the request body
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')                                                                                          //http://localhost:3000/tasks/some-id-of-the-task/status
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status)
    }
}

