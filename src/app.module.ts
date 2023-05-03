import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DataSource} from "typeorm";
import { AuthModule } from './auth/auth.module';
import {configValidationSchema} from "./config.schema";


@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: [`.env.stage.${process.env.STAGE}`],
          validationSchema: configValidationSchema
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
              const isProduction = configService.get('STAGE') === 'prod';
            return {
                ssl: isProduction,
                extra: {
                    ssl: isProduction ? {rejectUnauthorized: false} : null,
                },
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: +configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DATABASE'),
                autoLoadEntities: true,
                synchronize: true
            };
        }
      }),
      // TypeOrmModule.forRoot({
      //   type: 'postgres',
      //   host: process.env.POSTGRES_HOST,
      //   port: +process.env.POSTGRES_PORT,
      //   username: process.env.POSTGRES_USERNAME,
      //   password: process.env.POSTGRES_PASSWORD,
      //   database: process.env.POSTGRES_DATABASE,
      //   autoLoadEntities: true,
      //   synchronize: true
      // }),
      TasksModule,
      AuthModule,
  ],
  providers: [TasksService],
})

export class AppModule {
    // constructor(private dataSource: DataSource) {}
}