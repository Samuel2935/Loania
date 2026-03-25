import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('loans/:id/approve')
  async approve(@Param('id') id: string) {
    return this.adminService.approveLoan(id);
  }
}
