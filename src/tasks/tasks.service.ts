import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: TaskDto) {
    try {
      const count = await this.prisma.task.count({ where: { statusId: dto.statusId, userId } })
      return await this.prisma.task.create({
        data: { name: dto.name, description: dto.description, order: count, statusId: dto.statusId, userId },
        select: { id: true, createdAt: true, name: true, description: true, order: true }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(userId: string, statusId: string) {
    try {
      return await this.prisma.task.findMany({ where: { userId, statusId }, select: { id: true, createdAt: true, name: true, description: true } });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задач! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(userId: string, statusId: string, id: string) {
    try {
      return await this.prisma.task.findUnique({ where: { userId, id, statusId }, select: { id: true, createdAt: true, name: true, description: true } });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(userId: string, id: string, dto: TaskDto) {
    try {
      const count = await this.prisma.task.count({ where: { statusId: dto.statusId, userId } })
      return await this.prisma.task.update({
        where: { id, userId },
        data: { name: dto.name, description: dto.description, statusId: dto.statusId, order: count },
        select: { id: true, createdAt: true, name: true, description: true, order: true }
      })
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(userId: string, id: string) {
    try {
      const task = await this.prisma.task.findUnique({ where: { userId, id } });
      if (!task) throw new HttpException(`Произошла ошибка удаления задачи! Задание не найдено!`, HttpStatus.NOT_FOUND);
      await this.prisma.task.delete({ where: { id, userId } });
      return { message: 'Задача успешно удалена!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async updateOrderTasks(userId: string, dto: UpdateOrderDto) {
    try {
      return await this.prisma.$transaction(
        dto.ids.map((id, order) => this.prisma.task.update({
          where: { id, userId }, data: { order },
          select: { id: true, createdAt: true, name: true, description: true }
        }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка задачи!`, HttpStatus.NOT_FOUND);
    }
  }
}
