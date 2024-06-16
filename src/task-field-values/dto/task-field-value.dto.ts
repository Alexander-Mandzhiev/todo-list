import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Validate } from "class-validator"
import { IsNumberOrString } from "src/config/validation"



export class TaskFieldValueDto {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель" })
    @IsNotEmpty()
    @Validate(IsNumberOrString)
    value: number | string

    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    @IsNotEmpty()
    @IsString()
    taskFieldId: string

    @ApiProperty({ description: 'Уникальный идентификатор на задачу', example: "clxc46zrl00016z0jral1rjan" })
    @IsNotEmpty()
    @IsString()
    taskId: string
}

