import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { TaskFieldValuesModule } from './task-field-values/task-field-values.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProjectsModule,
    StatusesModule,
    TasksModule,
    AuthModule,
    TaskFieldsModule,
    TaskFieldValuesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
