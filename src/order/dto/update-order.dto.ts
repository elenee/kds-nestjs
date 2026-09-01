import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'src/generated/prisma/enums';

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status!: OrderStatus;
}
