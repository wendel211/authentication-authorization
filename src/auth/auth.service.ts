import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const user = await this.users.create({
      email: dto.email,
      password: dto.password,
    });
    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.saveRefresh(user.id, tokens.refresh_token);
    return tokens;
  }

  async signin(dto: AuthDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await argon2.verify(user.password, dto.password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.saveRefresh(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.users.setRefreshToken(userId, null);
    return { message: 'Logout realizado' };
  }

  async refresh(userId: string, rt: string) {
    const user = await this.users.findById(userId);
    if (!user || !user.hashedRt) throw new UnauthorizedException();

    const valid = await argon2.verify(user.hashedRt, rt);
    if (!valid) throw new ForbiddenException('Refresh token inválido');

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.saveRefresh(user.id, tokens.refresh_token); // rotação
    return tokens;
  }

  private async issueTokens(userId: string, email: string, role: string) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get('JWT_ACCESS_EXPIRES') ?? '15m',
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES') ?? '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  private async saveRefresh(userId: string, rt: string) {
    const hashed = await argon2.hash(rt);
    await this.users.setRefreshToken(userId, hashed);
  }
}
