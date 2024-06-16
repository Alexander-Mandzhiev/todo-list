import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { ProjectId, StatusDto, UpdateOrderDto } from './dto/status.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusesResponse, StatusesResponse, UpdateOrderStatusesResponse } from 'types/statuses.types';
import { DeleteMessage } from 'types/IBase';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Статус задачи')
@Auth()
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) { }

  @ApiBody({ type: StatusDto })
  @ApiOkResponse({ type: CreateStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@CurrentUser('id') id: string, @Body() dto: StatusDto) {
    return this.statusesService.create(id, dto);
  }

  @ApiOkResponse({ type: [StatusesResponse] })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id')
  findAll(@CurrentUser('id') id: string, @Param('project_id') projectId: string) {
    return this.statusesService.findAll(id, projectId);
  }

  @ApiOkResponse({ type: StatusesResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id/:id')
  findOne(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('id') id: string) {
    return this.statusesService.findOne(userId, projectId, id);
  }

  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: UpdateOrderStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(`order`)
  updateOrderStatuses(@Body() dto: UpdateOrderDto) {
    return this.statusesService.updateOrderStatuses(dto);
  }

  @ApiBody({ type: StatusDto })
  @ApiOkResponse({ type: CreateStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: StatusDto) {
    return this.statusesService.update(id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusesService.remove(id);
  }
}
