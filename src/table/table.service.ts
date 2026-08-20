import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) { }

  async create(createTableDto: CreateTableDto) {
    const table = await this.prisma.table.create({ data: createTableDto })
    return { data: table }
  }

  async findAll() {
    const tables = await this.prisma.table.findMany()
    return { data: tables }
  }

  async findOne(id: number) {
    const table = await this.prisma.table.findUnique({ where: { id } })
    if (!table) throw new NotFoundException('Table not found')
    return { data: table }
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const table = await this.prisma.table.findUnique({ where: { id } })
    if (!table) throw new NotFoundException('Table not found')
    const updated = await this.prisma.table.update({ where: { id }, data: updateTableDto })
    return { data: updated }
  }

  async remove(id: number) {
    const table = await this.prisma.table.findUnique({ where: { id } })
    if (!table) throw new NotFoundException('Table not found')
    await this.prisma.table.delete({ where: { id } })
    return { data: table }
  }
}
