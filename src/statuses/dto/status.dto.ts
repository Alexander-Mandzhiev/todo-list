import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"
import { RULE_MESSAGE, RULE_MESSAGE_LENGTH } from "src/util"

export class ProjectId {
    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx25gfmp00037r4g2jg2vete" })
    @IsOptional()
    @IsString()
    readonly projectId?: string
}

export class StatusDto extends ProjectId {
    @ApiProperty({ description: 'Название статуса задачи', example: "to do" })
    @IsNotEmpty()
    @MinLength(+RULE_MESSAGE_LENGTH, { message: RULE_MESSAGE })
    @IsString()
    readonly name: string

    @ApiProperty({ description: 'Порядковые номер столбца статуса задачи', example: "1" })
    @IsOptional()
    @IsNumber()
    readonly order?: number
}

export class UpdateOrderDto extends ProjectId {
    @ApiProperty({
        description: 'Порядковые номер столбца статуса задачи',
        example: [
            "clx31nibq00033pzz8cck5u2s"]
    })
    @IsOptional()
    @IsArray()
    readonly ids?: [string]
}