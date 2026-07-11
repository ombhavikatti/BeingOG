import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/**
 * UsersService — sole owner of User table operations.
 * Every other service that needs user data goes through here.
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ─────────────────────────────────────────────────
  //  CREATE
  // ─────────────────────────────────────────────────
  async create(data: {
    email: string;
    username: string;
    name: string;
    passwordHash: string;
  }): Promise<User> {
    // Check for existing email or username BEFORE trying to insert
    // (Prisma would throw a cryptic P2002 error otherwise — this gives clean 409s)
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existing) {
      if (existing.email === data.email) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }
      throw new ConflictException('This username is already taken');
    }

    return this.prisma.user.create({ data });
  }

  // ─────────────────────────────────────────────────
  //  READ
  // ─────────────────────────────────────────────────
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByIdOrThrow(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ─────────────────────────────────────────────────
  //  UPDATE
  // ─────────────────────────────────────────────────
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
