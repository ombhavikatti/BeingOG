import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // ← makes UsersService available to AuthModule
})
export class UsersModule {}
