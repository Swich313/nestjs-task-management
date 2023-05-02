import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UsersRepository} from "./users.repository";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      ConfigModule,
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
                secret: configService.get('ACCESS_TOKEN_SECRET'),
                signOptions: {
                  expiresIn: 3600,                                                                                              //expire in 3600s or 1 hour
                }
          })
      }),
      // JwtModule.register({
      //   secret: process.env.ACCESS_TOKEN_SECRET,
      //   signOptions: {
      //     expiresIn: 3600,                                                                                              //expire in 3600s or 1 hour
      //   }
      // }),
      TypeOrmModule.forFeature([User, UsersRepository])],
  providers: [AuthService, UsersRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
