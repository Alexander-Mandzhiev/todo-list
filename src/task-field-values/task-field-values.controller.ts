import { Controller, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, HttpStatus, ValidationPipe } from '@nestjs/common';
import { TaskFieldValuesService } from './task-field-values.service';
import { TaskFieldValueDto } from './dto/task-field-value.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Значения полей задач')
@Auth()
@Controller('task-field-values')
export class TaskFieldValuesController {
  constructor(private readonly taskFieldValuesService: TaskFieldValuesService) { }

  @ApiBody({ type: TaskFieldValueDto })
  @ApiOkResponse({ type: TaskFieldValueDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.create(dto);
  }

  @ApiBody({ type: TaskFieldValueDto })
  @ApiOkResponse({ type: TaskFieldValueDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch()
  update(@Body() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.update(dto);
  }

}
