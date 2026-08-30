import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    userName!: string;
    @IsNotEmpty()
    @IsString()
    password!: string;
}

