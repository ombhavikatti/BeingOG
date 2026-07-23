import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import type { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthenticatedUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  /**
   * POST /api/auth/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /api/auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * POST /api/auth/refresh
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }

  /**
   * GET /api/auth/me
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return { user };
  }

  // ─────────────────────────────────────────────────
  //  GOOGLE OAUTH
  // ─────────────────────────────────────────────────

  /**
   * GET /api/auth/google
   * Redirects to Google's OAuth consent screen.
   */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Guard triggers the redirect
  }

  /**
   * GET /api/auth/google/callback
   * Google redirects here after user approves.
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const authResponse = await this.authService.issueTokensForUser(user);

    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';

    const params = new URLSearchParams({
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
    });

    res.redirect(`${frontendUrl}/auth/oauth-callback?${params.toString()}`);
  }

  // ─────────────────────────────────────────────────
  //  GITHUB OAUTH
  // ─────────────────────────────────────────────────

  /**
   * GET /api/auth/github
   * Redirects to GitHub's OAuth consent screen.
   */
  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubAuth() {
    // Guard triggers the redirect
  }

  /**
   * GET /api/auth/github/callback
   * GitHub redirects here after user approves.
   */
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const authResponse = await this.authService.issueTokensForUser(user);

    const frontendUrl =
      this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';

    const params = new URLSearchParams({
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
    });

    res.redirect(`${frontendUrl}/auth/oauth-callback?${params.toString()}`);
  }
}
