import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsNotEmpty()
    @IsInt()
    menuItemId!: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity!: number;

    @IsOptional()
    @IsString()
    notes?: string;
}