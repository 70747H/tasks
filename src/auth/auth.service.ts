import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCeredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository, private readonly jwtService: JwtService){}

    async signUp(authCeredentialsDto: AuthCeredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCeredentialsDto);
    }

    async signIn(authCeredentialsDto: AuthCeredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCeredentialsDto);
        if(!username)
            throw new UnauthorizedException('Invalid credentials.');

        const payload  = { username };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
