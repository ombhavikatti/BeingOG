import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateHabitDto } from './create-habit.dto';

/**
 * UpdateHabitDto = all CreateHabitDto fields optional + isArchived toggle.
 * PartialType auto-generates the optional version.
 */
export class UpdateHabitDto extends PartialType(CreateHabitDto) {
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}