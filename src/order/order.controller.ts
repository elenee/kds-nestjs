import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderItemStatusDto } from './dto/UpdateOrderItemStatusDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'generated/prisma/enums';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.WAITER)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('active')
  findActive() {
    return this.orderService.findActive()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.KITCHEN)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch(':id/items/:itemId/status')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.KITCHEN)
  updateOrderItemStatus(
    @Param('itemId') itemId: string,
    @Body() updateOrderItemStatusDto: UpdateOrderItemStatusDto,
  ) {
    return this.orderService.updateOrderItemStatus(+itemId, updateOrderItemStatusDto.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.WAITER)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
