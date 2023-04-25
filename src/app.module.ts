import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {DataSource} from "typeorm";


@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize: true
      }),
      TasksModule,
  ],
  providers: [TasksService],
})
export class AppModule {
    // constructor(private dataSource: DataSource) {}
}