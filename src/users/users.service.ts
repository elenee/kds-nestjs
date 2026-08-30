import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        username: true,
        role: true
      }
    })
    return { data: user }
  }

  async findByUserName(userName: string) {
    const user = await this.prisma.user.findUnique({ where: { username: userName } })
    return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return { data: users }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found');
    return { data: user }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found');
    const updated = await this.prisma.user.update({ where: { id }, data: updateUserDto })
    return { data: updated }
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.user.delete({ where: { id } })
    return { data: 'User deleted successfully' }
  }
}
