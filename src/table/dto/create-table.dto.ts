import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    @IsNumber()
    tableNumber!: number
}
