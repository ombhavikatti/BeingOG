import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';

/**
 * All /api/habits routes require a valid JWT.
 * Ownership is enforced inside HabitsService — no habit leaks across users.
 */
@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  /**
   * POST /api/habits
   * Create a new habit for the logged-in user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateHabitDto,
  ) {
    return this.habitsService.create(user.id, dto);
  }

  /**
   * GET /api/habits?includeArchived=true
   * List habits for the logged-in user.
   */
  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('includeArchived') includeArchived?: string,
  ) {
    return this.habitsService.findAllForUser(user.id, {
      includeArchived: includeArchived === 'true',
    });
  }

  /**
   * GET /api/habits/:id
   * Get one habit by ID (only if it belongs to the user).
   */
  @Get(':id')
  findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.habitsService.findOneForUser(user.id, id);
  }

  /**
   * PATCH /api/habits/:id
   * Update a habit (name, color, target, archive, etc.).
   */
  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.update(user.id, id, dto);
  }

  /**
   * DELETE /api/habits/:id
   * Hard-delete a habit (and all its completions via cascade).
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    return this.habitsService.remove(user.id, id);
  }
}