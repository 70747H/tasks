import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCeredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCeredentialsDto: AuthCeredentialsDto): Promise<void>{
        return this.authService.signUp(authCeredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCeredentialsDto: AuthCeredentialsDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(authCeredentialsDto);
    }
}
