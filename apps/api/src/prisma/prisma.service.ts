import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService — the single point of database access for the entire app.
 *
 * Extends PrismaClient so we get all the .user, .habit, etc. query methods.
 * NestJS lifecycle hooks handle connecting on startup and disconnecting on shutdown.
 *
 * Inject it into any service:
 *   constructor(private readonly prisma: PrismaService) {}
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Prisma connected to database');
    } catch (err) {
      this.logger.error('❌ Prisma failed to connect', err);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('👋 Prisma disconnected');
  }
}
