import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderItemStatus } from "src/generated/prisma/enums";

export class UpdateOrderItemStatusDto {
    @IsNotEmpty()
    @IsEnum(OrderItemStatus)
    status!: OrderItemStatus;
}