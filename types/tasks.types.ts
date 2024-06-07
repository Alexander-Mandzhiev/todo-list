import { ApiProperty } from "@nestjs/swagger"
import { IBase } from "./IBase"

export class TasksResponse extends IBase {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Учебные материалы для ..." })
    description: string

    @ApiProperty({ description: 'Порядковые номер задачи', example: "1" })
    order: number
}