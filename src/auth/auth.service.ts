import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as  bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private prisma: PrismaService
    ) { }

    async signUp(signUpDto: SignUpDto) {
        const existingUser = await this.userService.findByUserName(signUpDto.username)
        if (existingUser) throw new ConflictException('User with this username already exists');
        const hashedPasswd = await bcrypt.hash(signUpDto.password, 10)
        await this.userService.create({ ...signUpDto, password: hashedPasswd })
        return { data: 'User created successfully' }
    }

    async validateUser(signInDto: SignInDto) {
        const user = await this.userService.findByUserName(signInDto.userName)
        if (!user) throw new UnauthorizedException('Invalid Credentials');
        const isValidPassw = await bcrypt.compare(signInDto.password, user.password)
        if (!isValidPassw) throw new UnauthorizedException('Invalid Credentials');
        return user
    }

    async signIn(user: any) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const accessToken = await this.jwtService.sign(payload, { expiresIn: '1h' })

        const { password, ...userWithoutPassword } = user
        return { userWithoutPassword, accessToken }
    }

    async currentUser(userId: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
