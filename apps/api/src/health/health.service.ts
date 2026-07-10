import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async check() {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();

    // Try to hit the database — a real check, not just "app is running"
    let dbStatus: 'connected' | 'error' = 'connected';
    let userCount = 0;

    try {
      userCount = await this.prisma.user.count();
    } catch (err) {
      this.logger.error('Database health check failed', err);
      dbStatus = 'error';
    }

    return {
      status: dbStatus === 'connected' ? 'ok' : 'degraded',
      timestamp,
      uptime: Number(uptime.toFixed(2)),
      database: {
        status: dbStatus,
        userCount,
      },
      service: 'beingog-api',
      version: '0.1.0',
    };
  }
}
