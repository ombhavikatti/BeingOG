import { Injectable, NotFoundException } from '@nestjs/common';
import { Habit, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

/**
 * HabitsService — sole owner of Habit table operations.
 * Every method requires a userId to enforce ownership.
 */
@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─────────────────────────────────────────────────
  //  CREATE
  // ─────────────────────────────────────────────────
  async create(userId: string, dto: CreateHabitDto): Promise<Habit> {
    return this.prisma.habit.create({
      data: {
        userId,
        name: dto.name.trim(),
        description: dto.description?.trim(),
        icon: dto.icon ?? '🎯',
        color: dto.color ?? '#6366F1',
        frequency: dto.frequency ?? 'DAILY',
        target: dto.target ?? 1,
      },
    });
  }

  // ─────────────────────────────────────────────────
  //  LIST (user's own habits only)
  // ─────────────────────────────────────────────────
  async findAllForUser(
    userId: string,
    options: { includeArchived?: boolean } = {},
  ) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const habits = await this.prisma.habit.findMany({
      where: {
        userId,
        ...(options.includeArchived ? {} : { isArchived: false }),
      },
      orderBy: [{ isArchived: 'asc' }, { createdAt: 'desc' }],
      include: {
        completions: {
          where: {
            completedAt: { gte: startOfToday, lt: startOfTomorrow },
          },
          take: 1, // only need to know if one exists
        },
      },
    });

    // Attach a clean `completedToday` boolean + strip the raw completions array
    return habits.map((h) => ({
      ...h,
      completedToday: h.completions.length > 0,
      completions: undefined,
    }));
  }

  // ─────────────────────────────────────────────────
  //  FIND ONE (ownership-checked)
  // ─────────────────────────────────────────────────
  async findOneForUser(userId: string, habitId: string): Promise<Habit> {
    const habit = await this.prisma.habit.findUnique({
      where: { id: habitId },
    });
    if (!habit) throw new NotFoundException('Habit not found');
    if (habit.userId !== userId) {
      // Return 404 instead of 403 to avoid leaking existence
      throw new NotFoundException('Habit not found');
    }
    return habit;
  }

  // ─────────────────────────────────────────────────
  //  UPDATE
  // ─────────────────────────────────────────────────
  async update(
    userId: string,
    habitId: string,
    dto: UpdateHabitDto,
  ): Promise<Habit> {
    // Ownership check first (throws if not found or not yours)
    await this.findOneForUser(userId, habitId);

    const data: Prisma.HabitUpdateInput = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.description !== undefined)
      data.description = dto.description?.trim();
    if (dto.icon !== undefined) data.icon = dto.icon;
    if (dto.color !== undefined) data.color = dto.color;
    if (dto.frequency !== undefined) data.frequency = dto.frequency;
    if (dto.target !== undefined) data.target = dto.target;
    if (dto.isArchived !== undefined) data.isArchived = dto.isArchived;

    return this.prisma.habit.update({
      where: { id: habitId },
      data,
    });
  }

  // ─────────────────────────────────────────────────
  //  DELETE (hard delete — completions cascade automatically)
  // ─────────────────────────────────────────────────
  async remove(userId: string, habitId: string): Promise<{ id: string }> {
    await this.findOneForUser(userId, habitId);
    await this.prisma.habit.delete({ where: { id: habitId } });
    return { id: habitId };
  }

  // ─────────────────────────────────────────────────
  //  COMPLETIONS
  // ─────────────────────────────────────────────────

  /**
   * Marks a habit as completed for TODAY.
   * Idempotent — if already completed today, returns the existing record.
   */
  async completeToday(userId: string, habitId: string) {
    await this.findOneForUser(userId, habitId); // ownership check

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    // Check if already completed today
    const existing = await this.prisma.habitCompletion.findFirst({
      where: {
        habitId,
        completedAt: { gte: startOfToday, lt: startOfTomorrow },
      },
    });

    if (existing) return existing;

    return this.prisma.habitCompletion.create({
      data: { habitId, completedAt: new Date() },
    });
  }

  /**
   * Removes TODAY's completion for a habit.
   * If not completed today, returns null (no-op).
   */
  async uncompleteToday(userId: string, habitId: string) {
    await this.findOneForUser(userId, habitId); // ownership check

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const existing = await this.prisma.habitCompletion.findFirst({
      where: {
        habitId,
        completedAt: { gte: startOfToday, lt: startOfTomorrow },
      },
    });

    if (!existing) return { id: null };

    await this.prisma.habitCompletion.delete({ where: { id: existing.id } });
    return { id: existing.id };
  }
}
