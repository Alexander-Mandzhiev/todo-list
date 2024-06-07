import { ApiProperty } from "@nestjs/swagger";
import { TasksResponse } from "./tasks.types";


export class CreateStatusesResponse {
    @ApiProperty({ description: 'Уникальный идентификатор', example: "clx3968w80001klbslniv3jwf" })
    id: string;

    @ApiProperty({ description: 'Название статуса задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Порядковые номер столбца статуса задачи', example: "1" })
    order: number
}

export class StatusesResponse extends CreateStatusesResponse {
    @ApiProperty({
        description: 'Задачи относящиеся к данному статусу',
        example: [
            {
                "id": "clx37l48q0001ckthfwhmgn5o",
                "name": "Сделать перерыв",
                "description": "Сделать перерыв описание 123",
                "order": 0
            }
        ]
    })
    tasks: TasksResponse[]
}