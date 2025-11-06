import { Controller, Get } from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@GetUser() user: any) {
    return { user };
  }

  @Roles(UserRole.ADMIN)
  @Get('admin/metrics')
  adminMetrics() {
    return { message: 'Apenas ADMIN vê isso.' };
  }
}
