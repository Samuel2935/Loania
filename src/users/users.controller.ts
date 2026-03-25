import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import type { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthRequest) {
    return this.usersService.findById(req.user.id);
  }
}
