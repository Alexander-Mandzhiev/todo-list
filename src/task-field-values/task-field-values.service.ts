import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskFieldValueDto } from './dto/task-field-value.dto';
import { PrismaService } from 'src/prisma.service';
import { TaskFieldsService } from 'src/task-fields/task-fields.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class TaskFieldValuesService {

  constructor(private prisma: PrismaService, private taskFieldsService: TaskFieldsService, private tasksService: TasksService) { }

  async create(dto: TaskFieldValueDto) {
    try {
      const { field } = await this.taskFieldsService.findOne(dto.taskFieldId)
      if (field === 'integer' && typeof dto.value === 'number') {
        return await this.prisma.taskIntValues.create({
          data: { value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
        });
      }
      if (field === 'string' && typeof dto.value === 'string') {
        return await this.prisma.taskStrValues.create({
          data: { value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
        });
      }
      return { message: `Проверьте правильность отправляемых данных!` }
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }


  async update(dto: TaskFieldValueDto) {
    try {
      const existTaskField = await this.taskFieldsService.findOne(dto.taskFieldId)
      const existTask = await this.tasksService.findOneById(dto.taskId)
      if (!existTaskField || !existTask) throw new HttpException(`Произошла ошибка создания значения поля задачи! Поле задачи или задача отсутствуют!`, HttpStatus.BAD_REQUEST)
      if (existTaskField.field === 'integer' && typeof dto.value === 'number') {
        return await this.prisma.taskIntValues.update({
          where: { task_int_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
        });
      }
      if (existTaskField.field === 'string' && typeof dto.value === 'string') {
        return await this.prisma.taskStrValues.update({
          where: { task_str_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
        });
      }
      return { message: `Проверьте правильность отправляемых данных!` }
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }
}