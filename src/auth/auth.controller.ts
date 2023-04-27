import {Body, Controller, Inject, Post, Req, UseGuards} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService)
        private authService: AuthService
    ) {}

    @Post('/signup')
    signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/login')
    login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.login(authCredentialsDto);
    }


}
