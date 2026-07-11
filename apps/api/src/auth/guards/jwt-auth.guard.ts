import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Attach to any route with @UseGuards(JwtAuthGuard)
 * to require a valid JWT access token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
