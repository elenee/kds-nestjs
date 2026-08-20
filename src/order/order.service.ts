import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemStatus } from 'generated/prisma/enums';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        tableId: createOrderDto.tableId,
        items: {
          create: createOrderDto.items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            notes: item.notes
          }))
        }
      },
      include: { items: true }
    })
    return { data: order }
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({ include: { items: true } })
    return { data: orders }
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } })
    if (!order) throw new NotFoundException('Order not found');
    return { data: order }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } })
    if (!order) throw new NotFoundException('Order not found');
    const updated = await this.prisma.order.update({ where: { id }, data: updateOrderDto })
    return { data: updated }
  }

  async remove(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } })
    if (!order) throw new NotFoundException('Order not found');
    await this.prisma.order.delete({ where: { id } })
    return { data: 'Order cancelled successfully' }
  }

  async updateOrderItemStatus(itemId: number, status: OrderItemStatus) {
    const orderItem = await this.prisma.orderItem.findUnique({ where: { id: itemId } });
    if (!orderItem) throw new NotFoundException('Order item not found');

    const updated = await this.prisma.orderItem.update({
      where: { id: itemId },
      data: { status },
    });
    return { data: updated };
  }
}
