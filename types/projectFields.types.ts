import { ApiProperty } from "@nestjs/swagger"
import { IBase } from "./IBase"
import { TypeField } from "@prisma/client"

export class CreateProjectFieldResponse extends IBase {

    @ApiProperty({ description: 'Название поля задачи', example: "Исполнитель" })
    name: string

    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx25gfmp00037r4g2jg2vete" })
    projectId: string

    @ApiProperty({ description: 'список', example: "string | integer" })
    field: TypeField
}


export class ProjectFieldsResponse {
    @ApiProperty({
        example: [
            {
                "id": "clxfvplou0001lbfs22szxu7v",
                "name": "Время выполнения",
                "field": "integer",
                "taskFieldsEnumValue": []
            },
            {
                "id": "clxfx7ljv0001i7zd2toarvak",
                "name": "Исполнитель",
                "field": "string",
                "taskFieldsEnumValue": []
            },
            {
                "id": "clxhf60d40007et0jhbcil2vm",
                "name": "Приоритет",
                "field": "enum",
                "taskFieldsEnumValue": [
                    {
                        "id": "clxhf653e0009et0jkw8e4sdu",
                        "name": "Низкий",
                        "taskFieldId": "clxhf60d40007et0jhbcil2vm"
                    },
                    {
                        "id": "clxhf653e000bet0j99tnjpv8",
                        "name": "Средний",
                        "taskFieldId": "clxhf60d40007et0jhbcil2vm"
                    },
                    {
                        "id": "clxhf653f000det0j881ktsap",
                        "name": "Высокий",
                        "taskFieldId": "clxhf60d40007et0jhbcil2vm"
                    }
                ]
            }
        ]

    })
    response: [CreateProjectFieldResponse]
}

export class TaskFieldValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель" })
    value: number | string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
    @ApiProperty({ description: 'Уникальный идентификатор на задачу', example: "clxc46zrl00016z0jral1rjan" })
    taskId: string
}

export class ResponseTaskIntValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "2" })
    value: number
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseTaskStrValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель" })
    value: string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseCreateEnumValues extends IBase {
    @ApiProperty({ description: 'Название поля задачи', example: "Средний" })
    name: string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseEnum {
    @ApiProperty({
        example: [
            {
                "id": "clxhf653e0009et0jkw8e4sdu",
                "name": "Низкий",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            },
            {
                "id": "clxhf653e000bet0j99tnjpv8",
                "name": "Средний",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            },
            {
                "id": "clxhf653f000det0j881ktsap",
                "name": "Высокий",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            }
        ]
    })
    response: ResponseCreateEnumValues[]

}