import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, ValidateNested } from "class-validator"
import { CreateOrderItemDto } from "./CreateOrderItemDto "
import { Type } from "class-transformer"

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    tableId!: number
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[]
}
