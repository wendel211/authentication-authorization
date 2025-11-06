// src/auth/types/jwt-payload.type.ts

/**
 * Define a estrutura (shape) do payload JWT.
 * Esse payload é o que o NestJS grava dentro do token
 * quando chamamos JwtService.signAsync() no AuthService.
 *
 * Cada campo será incluído automaticamente no token
 * e estará disponível depois em req.user (quando o guard validar).
 */
export type JwtPayload = {
  /**
   * O campo "sub" (subject) é uma convenção JWT.
   * Aqui ele representa o ID do usuário (userId).
   */
  sub: string;

  /**
   * O e-mail do usuário, útil para identificar
   * o dono do token sem precisar buscar no banco.
   */
  email: string;

  /**
   * Papel (role) do usuário.
   * Exemplo: "user" | "admin"
   */
  role: string;
};
