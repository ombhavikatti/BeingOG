import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  exports: [HabitsService], // Phase 5.3 needs this from Completions module
})
export class HabitsModule {}
