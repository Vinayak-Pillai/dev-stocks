import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/utils/decorators';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.username, authDto.password);
  }
}
