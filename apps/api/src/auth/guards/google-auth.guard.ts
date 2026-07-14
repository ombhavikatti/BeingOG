import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Attach to /auth/google routes to trigger the OAuth flow.
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
