import { IsDefined, IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCeredentialsDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Pasword is too weak, should contain at least 1 upper case letter, 1 lower case letter, 1 number or special character' })
    password: string;
}