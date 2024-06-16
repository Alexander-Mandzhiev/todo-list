import { ApiProperty } from "@nestjs/swagger"
import { TypeField } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class UpdateTaskFieldDto {

    @ApiProperty({ description: 'Описсание проекта', example: "Исполнитель" })
    @IsNotEmpty()
    @IsString()
    readonly name: string
}

export class TaskFieldDto extends UpdateTaskFieldDto {
    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx25gfmp00037r4g2jg2vete" })
    @IsNotEmpty()
    @IsString()
    readonly projectId: string

    @ApiProperty({ description: 'Описсание проекта', example: "string | integer" })
    @IsNotEmpty()
    @IsEnum(TypeField)
    readonly field: TypeField
}
