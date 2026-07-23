import {
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Frequency } from '@prisma/client';

export class CreateHabitDto {
  @IsString()
  @MinLength(1, { message: 'Habit name is required' })
  @MaxLength(120, { message: 'Habit name is too long (max 120 chars)' })
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description is too long (max 500 chars)' })
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4, { message: 'Icon must be a single emoji (max 4 chars)' })
  icon?: string;

  @IsOptional()
  @IsHexColor({ message: 'Color must be a valid hex color (e.g. #6366F1)' })
  color?: string;

  @IsOptional()
  @IsEnum(Frequency, {
    message: 'Frequency must be DAILY, WEEKLY, MONTHLY, or CUSTOM',
  })
  frequency?: Frequency;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Target must be at least 1' })
  @Max(100, { message: 'Target cannot exceed 100' })
  target?: number;
}
