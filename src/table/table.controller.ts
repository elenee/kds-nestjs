import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'generated/prisma/enums';

@Controller('table')
@UseGuards(JwtAuthGuard)
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @Post()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
