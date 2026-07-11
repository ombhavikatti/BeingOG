import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// Shape of what we sign into the JWT
export interface JwtTokenPayload {
  sub: string; // subject = userId (JWT convention)
  email: string;
  username: string;
}

// Shape we return to the client after login/register
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly saltRounds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    this.saltRounds = Number(
      this.config.get<string>('BCRYPT_SALT_ROUNDS') ?? '12',
    );
  }

  // ─────────────────────────────────────────────────
  //  REGISTER
  // ─────────────────────────────────────────────────
  async register(dto: RegisterDto): Promise<AuthResponse> {
    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);

    const user = await this.usersService.create({
      email: dto.email.toLowerCase().trim(),
      username: dto.username.toLowerCase().trim(),
      name: dto.name.trim(),
      passwordHash,
    });

    this.logger.log(`📝 New user registered: ${user.email}`);

    return this.buildAuthResponse(user);
  }

  // ─────────────────────────────────────────────────
  //  LOGIN
  // ─────────────────────────────────────────────────
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(
      dto.email.toLowerCase().trim(),
    );

    // Same error whether email doesn't exist OR password wrong.
    // Prevents attackers from probing which emails have accounts.
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`🔓 User logged in: ${user.email}`);

    return this.buildAuthResponse(user);
  }

  // ─────────────────────────────────────────────────
  //  HELPERS
  // ─────────────────────────────────────────────────
  private async buildAuthResponse(user: User): Promise<AuthResponse> {
    const payload: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
    const accessExpiresIn =
      this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m';
    const refreshExpiresIn =
      this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn,
    } as any);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    } as any);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken,
    };
  }
}
