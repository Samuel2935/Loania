import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.authService.login(body.email, body.password);
  }
}
