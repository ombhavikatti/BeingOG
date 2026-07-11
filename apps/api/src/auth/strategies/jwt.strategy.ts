import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtTokenPayload } from '../auth.service';

/**
 * JwtStrategy — runs on every protected request.
 *
 * 1. Extracts JWT from the `Authorization: Bearer <token>` header
 * 2. Verifies the signature using JWT_ACCESS_SECRET
 * 3. Auto-rejects expired tokens
 * 4. Loads the user from DB and attaches as `req.user`
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret = config.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  /**
   * Passport calls this after successful JWT verification.
   * Whatever we return becomes `req.user` in controllers.
   */
  async validate(payload: JwtTokenPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
    // Return a slim safe user (no passwordHash)
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  }
}
