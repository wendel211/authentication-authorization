import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email já cadastrado.');

    const hash = await argon2.hash(dto.password);

    const user = this.repo.create({
      email: dto.email,
      password: hash,
      role: dto.role ?? UserRole.USER,
    });

    return await this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async setRefreshToken(userId: string, hashedRt: string | null): Promise<void> {
    await this.repo.update({ id: userId }, { hashedRt: hashedRt ?? null });
  }
}
