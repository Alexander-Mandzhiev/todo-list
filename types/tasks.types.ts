import { ApiProperty } from "@nestjs/swagger"
import { IBaseExtended } from "./IBase"
import { ResponseTaskIntValues, ResponseTaskStrValues } from "./projectFields.types"

export class CreateTasksResponse extends IBaseExtended {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Учебные материалы для ..." })
    description: string

    @ApiProperty({ description: 'Порядковые номер задачи', example: "1" })
    order: number
}

export class TasksResponse extends IBaseExtended {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Учебные материалы для ..." })
    description: string

    @ApiProperty({
        example: [{
            "value": "Петр",
            "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
        }]
    })
    taskStrValues: ResponseTaskStrValues

    @ApiProperty({
        example: [{
            "value": "1",
            "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
        }]
    })
    taskIntValues: ResponseTaskIntValues
}

export class UpdateOrderTasksResponse {
    @ApiProperty({
        example: [
            {
                "id": "clx31nibq00033pzz8cck5u2s",
                "createdAt": "2024-06-06T20:07:03.849Z",
                "name": "Сесть за работу",
                "description": "Сесть за работу, Дописать круд",
                "taskIntValues": [
                    {
                        "value": 2,
                        "taskFieldId": "clxfvplou0001lbfs22szxu7v"
                    }
                ],
                "taskStrValues": [
                    {
                        "value": "Петр",
                        "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
                    }
                ]
            },
            {
                "id": "clx31ne1700013pzzcen2jla2",
                "createdAt": "2024-06-06T12:03:24.218Z",
                "name": "Сделать перерыв",
                "description": "Сделать перерыв описание 123",
                "taskIntValues": [],
                "taskStrValues": []
            }
        ]
    })
    response: []
}