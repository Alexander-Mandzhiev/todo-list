import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskFieldDto, UpdateTaskFieldDto } from './dto/task-field.dto';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TaskFieldsService {
  constructor(private prisma: PrismaService, private projectService: ProjectsService) { }

  async findOne(id?: string) {
    const taskField = await this.prisma.taskFields.findUnique({ where: { id } });
    return taskField
  }

  async create(userId: string, dto: TaskFieldDto) {
    try {
      const project = await this.projectService.findOneProject(userId, dto.projectId)
      if (!project) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

      return await this.prisma.taskFields.create({
        data: { name: dto.name, projectId: dto.projectId, field: dto.field },
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания поля проекта! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }


  async findAll(userId: string, projectId: string) {
    try {
      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

      const taskFields = await this.prisma.taskFields.findMany({
        where: { projectId: projectId },
        select: {
          id: true, name: true, field: true
        }
      })
      return taskFields
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения полей проекта!`, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, dto: UpdateTaskFieldDto) {
    try {
      return await this.prisma.taskFields.update({
        where: { id },
        data: { name: dto.name },
      })
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления поля проекта! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const taskField = await this.findOne(id)
    if (!taskField) throw new HttpException(`Произошла ошибка получения проекта!`, HttpStatus.NOT_FOUND)
    await this.prisma.taskFields.delete({ where: { id } });
    return { message: 'Поле проекта успешно удалено!' };
  }
}
