import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = {username};
            const accessToken: string = this.jwtService.sign(payload);
            return {accessToken};
        } else {
            throw new UnauthorizedException('Please check your login credentials!');
        }
    }
}
