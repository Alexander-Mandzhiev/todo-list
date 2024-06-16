import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateTasksResponse, TasksResponse, UpdateOrderTasksResponse } from 'types/tasks.types';
import { DeleteMessage } from 'types/IBase';

@ApiTags('Задачи')
@Auth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiBody({ type: TaskDto })
  @ApiOkResponse({ type: CreateTasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() dto: TaskDto) {
    return this.tasksService.create(dto);
  }

  @ApiOkResponse({ type: [TasksResponse] })
  @HttpCode(HttpStatus.OK)
  @Get(':status_id')
  findAll(@Param('status_id') statusId: string) {
    return this.tasksService.findAll(statusId);
  }

  @ApiOkResponse({ type: TasksResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':status_id/:id')
  findOne(@Param('status_id') statusId: string, @Param('id') id: string) {
    return this.tasksService.findOne(statusId, id);
  }

  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: UpdateOrderTasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(`order`)
  updateOrderStatuses(@Body() dto: UpdateOrderDto) {
    return this.tasksService.updateOrderTasks(dto);
  }

  @ApiBody({ type: TaskDto })
  @ApiOkResponse({ type: CreateTasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: TaskDto) {
    return this.tasksService.update(id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
