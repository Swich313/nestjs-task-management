import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UsersRepository} from "./users.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      ConfigModule.forRoot(),
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: process.env.ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: 3600,                                                                                              //expire in 3600s or 1 hour
        }
      }),
      TypeOrmModule.forFeature([User, UsersRepository])],
  providers: [AuthService, UsersRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
