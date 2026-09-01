import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Role } from "src/generated/prisma/enums";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    username!: string;
    @IsNotEmpty()
    @IsString()
    @Length(6, 30)
    password!: string;
    @IsNotEmpty()
    @IsEnum(Role)
    role!: Role;
}
