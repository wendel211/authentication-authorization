import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.create(dto);
    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.usersService.setRefreshToken(user.id, await argon2.hash(tokens.refresh_token));
    return tokens;
  }

  async signin(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new ForbiddenException('Credenciais inválidas');

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.usersService.setRefreshToken(user.id, await argon2.hash(tokens.refresh_token));
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.setRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, rt: string): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException('Acesso negado');

    const valid = await argon2.verify(user.hashedRt, rt);
    if (!valid) throw new ForbiddenException('Acesso negado');

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.usersService.setRefreshToken(user.id, await argon2.hash(tokens.refresh_token));
    return tokens;
  }

  private async issueTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }
}
