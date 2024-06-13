import { ApiProperty } from "@nestjs/swagger"
import { IBase } from "./IBase"

export class CreateTasksResponse extends IBase {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Учебные материалы для ..." })
    description: string

    @ApiProperty({ description: 'Порядковые номер задачи', example: "1" })
    order: number
}

export class TasksResponse extends IBase {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Учебные материалы для ..." })
    description: string
}

export class UpdateOrderTasksResponse {
    @ApiProperty({
        example: [
            {
                "id": "clx3ov3xk0001zbspczvdoddm",
                "createdAt": "2024-06-06T20:07:03.849Z",
                "name": "Сесть за работу",
                "description": "Сесть за работу, Дописать круд"
            },
            {
                "id": "clx37l48q0001ckthfwhmgn5o",
                "createdAt": "2024-06-06T12:03:24.218Z",
                "name": "Сделать перерыв",
                "description": "Сделать перерыв описание 123"
            },
            {
                "id": "clx3otnem0001o1u5bnsj8074",
                "createdAt": "2024-06-06T20:05:55.775Z",
                "name": "Лечь спать",
                "description": "Сделать перерыв описание 123"
            }
        ]
    })
    response: []
}