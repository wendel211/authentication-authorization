import { Module } from '@nestjs/common';
import { ControllersController } from './controllers.controller';

@Module({
  controllers: [ControllersController]
})
export class UsersModule {}
