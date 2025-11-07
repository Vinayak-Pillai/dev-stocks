import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/utils/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @Post('login'){

  // }
}
