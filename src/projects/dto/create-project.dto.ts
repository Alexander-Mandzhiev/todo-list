import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNotEmpty, MinLength } from "class-validator"
import { RULE_MESSAGE, RULE_MESSAGE_LENGTH } from "src/util"

export class ProjectDto {
    @ApiProperty({ description: 'Название проекта', example: "Учёба" })
    @IsNotEmpty()
    @IsString()
    @MinLength(+RULE_MESSAGE_LENGTH, { message: RULE_MESSAGE })
    readonly name: string

    @ApiProperty({ description: 'Описсание проекта', example: "Учебные материалы для ..." })
    @IsOptional()
    @IsString()
    readonly description?: string

}
