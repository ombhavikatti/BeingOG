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
  //  CREATE FROM OAUTH (no password)
  // ─────────────────────────────────────────────────
  async createFromOAuth(data: {
    email: string;
    name: string;
    avatarUrl?: string;
  }): Promise<User> {
    // Auto-generate a username from the email prefix
    // e.g., "om@gmail.com" → "om", then "om1", "om2" if taken
    const baseUsername = data.email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .slice(0, 20);

    let username = baseUsername;
    let suffix = 0;
    while (await this.prisma.user.findUnique({ where: { username } })) {
      suffix += 1;
      username = `${baseUsername.slice(0, 18)}${suffix}`.slice(0, 20);
    }

    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        username,
        name: data.name.trim(),
        avatarUrl: data.avatarUrl,
        passwordHash: null, // OAuth users have no password
        emailVerified: true, // Google already verified their email!
      },
    });
  }

  // ─────────────────────────────────────────────────
  //  FIND OR CREATE FROM OAUTH
  // ─────────────────────────────────────────────────
  async findOrCreateFromOAuth(data: {
    email: string;
    name: string;
    avatarUrl?: string;
  }): Promise<User> {
    const existing = await this.findByEmail(data.email.toLowerCase().trim());
    if (existing) {
      // User already exists (maybe they used password before) → just log them in
      // Optionally: update their avatarUrl if it changed
      if (data.avatarUrl && existing.avatarUrl !== data.avatarUrl) {
        return this.update(existing.id, { avatarUrl: data.avatarUrl });
      }
      return existing;
    }
    return this.createFromOAuth(data);
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
