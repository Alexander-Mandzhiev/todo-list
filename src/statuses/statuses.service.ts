import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectId, StatusDto, UpdateOrderDto } from './dto/status.dto';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService, private projectService: ProjectsService) { }

  async findOneStatus(id?: string) {
    const status = await this.prisma.status.findUnique({ where: { id } });
    return status
  }

  async create(userId: string, dto: StatusDto) {
    try {
      const existProject = await this.projectService.findOneProject(userId, dto.projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

      const count = await this.prisma.status.count({ where: { projectId: dto.projectId } })
      return await this.prisma.status.create({
        data: { name: dto.name, order: count, projectId: dto.projectId },
        select: { id: true, name: true, order: true }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания статуса проекта! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(userId: string, projectId: string) {
    const existProject = await this.projectService.findOneProject(userId, projectId)
    if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

    const statuses = await this.prisma.status.findMany({
      where: { projectId: projectId },
      select: { id: true, name: true }
      , orderBy: { order: "asc" }
    })
    if (!statuses) throw new HttpException(`Произошла ошибка получения статусов проекта!`, HttpStatus.NOT_FOUND)
    return statuses
  }

  async findOne(userId: string, projectId: string, id: string) {
    const existProject = await this.projectService.findOneProject(userId, projectId)
    if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

    const status = await this.prisma.status.findUnique({
      where: { id },
      select: { id: true, name: true }
    });
    if (!status) throw new HttpException(`Произошла ошибка получения статуса проекта! Статус проекта не найден!`, HttpStatus.NOT_FOUND);
    return status
  }

  async update(id: string, dto: StatusDto) {
    const status = await this.findOneStatus(id)
    if (!status) throw new HttpException(`Произошла ошибка обновления статуса проекта! Статус проекта не найден!`, HttpStatus.NOT_FOUND);
    return await this.prisma.status.update({
      where: { id }, data: { name: dto.name, order: dto.order, projectId: dto.projectId },
      select: {
        id: true, name: true, order: true,
        tasks: { select: { id: true, createdAt: true, name: true, description: true, order: true } }
      }
    });
  }

  async remove(id: string) {
    const status = await this.findOneStatus(id)
    if (!status) throw new HttpException(`Произошла ошибка удаления статуса проекта! Статус проекта не найден!`, HttpStatus.NOT_FOUND);
    await this.prisma.status.delete({ where: { id } });
    return { message: 'Статус проекта успешно удален!' };
  }

  async updateOrderStatuses(dto: UpdateOrderDto) {
    try {
      return await this.prisma.$transaction(
        dto.ids.map((id, order) => this.prisma.status.update({
          where: { id },
          data: { order },
          select: { id: true, name: true },
        }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка статуса проекта!`, HttpStatus.NOT_FOUND);
    }
  }
}
