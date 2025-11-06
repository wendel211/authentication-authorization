import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '../users/decorators/public.decorator';
import { GetUser } from '../users/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.auth.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.auth.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@GetUser('sub') userId: string) {
    return this.auth.logout(userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@GetUser('sub') userId: string, @GetUser('refreshToken') refreshToken: string) {
    return this.auth.refresh(userId, refreshToken);
  }
}
