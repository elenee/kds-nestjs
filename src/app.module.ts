import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './table/table.module';
import { OrderModule } from './order/order.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, MenuModule, TableModule, OrderModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
