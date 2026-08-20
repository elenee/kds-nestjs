import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderItemStatus } from "generated/prisma/client";

export class UpdateOrderItemStatusDto {
    @IsNotEmpty()
    @IsEnum(OrderItemStatus)
    status!: OrderItemStatus;
}