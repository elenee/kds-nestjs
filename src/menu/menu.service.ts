import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async create(createMenuDto: CreateMenuDto) {
    const menuItem = await this.prisma.menuItem.create({ data: createMenuDto })
    return menuItem
  }

  async findAll() {
    const menuItems = await this.prisma.menuItem.findMany()
    return { data: menuItems }
  }

  async findOne(id: number) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } })
    if (!menuItem) throw new NotFoundException('Menu Item not found');
    return { data: menuItem }
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } })
    if (!menuItem) throw new NotFoundException('Menu Item not found');
    const updated = await this.prisma.menuItem.update({ where: { id }, data: updateMenuDto })
    return { data: updated }
  }

  async remove(id: number) {
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id } })
    if (!menuItem) throw new NotFoundException('Menu Item not found');
    await this.prisma.menuItem.delete({ where: { id } })
    return { data: 'Menu item deleted successfully' };
  }
}
