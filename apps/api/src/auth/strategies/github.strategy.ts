import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-github2';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const clientID = config.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = config.get<string>('GITHUB_CLIENT_SECRET');
    const callbackURL = config.get<string>('GITHUB_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('GitHub OAuth environment variables are missing');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['user:email'], // request access to email addresses
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: unknown) => void,
  ): Promise<void> {
    try {
      // GitHub sometimes hides email — fall back to first available
      const email =
        profile.emails?.[0]?.value ??
        `${profile.username}@users.noreply.github.com`;

      const user = await this.usersService.findOrCreateFromOAuth({
        email,
        name: profile.displayName || profile.username || email.split('@')[0],
        avatarUrl: profile.photos?.[0]?.value,
      });

      done(null, user);
    } catch (err) {
      done(err as Error, false);
    }
  }
}