import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload.type';

function extractRt(req: Request): string | null {
  // Tenta extrair o refresh token do header Authorization: Bearer <token>
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (token) return token;

  // Alternativamente, permite pegar via cookie httpOnly chamado 'refresh_token'
  if (req.cookies?.['refresh_token']) return req.cookies['refresh_token'];

  return null;
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: extractRt,
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = extractRt(req);
    if (!refreshToken) throw new UnauthorizedException('Refresh token ausente');
    return { ...payload, refreshToken };
  }
}
