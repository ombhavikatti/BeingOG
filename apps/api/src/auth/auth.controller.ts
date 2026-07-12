import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as currentUserDecorator from './decorators/current-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/register
   * Creates a new user + returns tokens.
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /api/auth/login
   * Verifies credentials + returns tokens.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  /**
   * POST /api/auth/refresh
   * Trades a valid refresh token for a fresh access + refresh token pair.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
  /**
   * GET /api/auth/me
   * Returns the current authenticated user's profile.
   * Requires: Authorization: Bearer <accessToken>
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(
    @currentUserDecorator.CurrentUser()
    user: currentUserDecorator.AuthenticatedUser,
  ) {
    return { user };
  }
}
