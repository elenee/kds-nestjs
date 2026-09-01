import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './redis-io.adapter';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const usersService = app.get(UsersService)
  await usersService.ensureAdminExists()

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
