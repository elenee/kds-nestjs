import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { User } from './decorators/user.decorator';
import { Role } from 'src/generated/prisma/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req) {
    return this.authService.signIn(req.user)
  }

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  currentUser(@User() userId: number) {
    return this.authService.currentUser(userId)
  }
}
