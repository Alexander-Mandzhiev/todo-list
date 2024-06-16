import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumValuesDto, TaskFieldValueDto } from './dto/task-field-value.dto';
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
      if (field === 'enum' && typeof dto.value === 'string') {
        const { name } = await this.prisma.taskFieldsEnumValue.findUnique({ where: { id: dto.value } })
        return await this.prisma.taskEnumValues.create({
          data: { value: name, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
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

      if (existTaskField.field === 'enum' && typeof dto.value === 'string') {
        const { name } = await this.prisma.taskFieldsEnumValue.findUnique({ where: { id: dto.value } })
        return await this.prisma.taskEnumValues.update({
          where: { task_enum_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value: name, taskFieldId: dto.taskFieldId, taskId: dto.taskId },
        });
      }

      return { message: `Проверьте правильность отправляемых данных!` }
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async createEnumValueList(dto: EnumValuesDto) {
    try {
      const valuesEnum = dto.values.split(',')
      return await this.prisma.$transaction(
        valuesEnum.map((item) => this.prisma.taskFieldsEnumValue.create({ data: { name: item, taskFieldId: dto.taskFieldId } }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения для списка поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }
}