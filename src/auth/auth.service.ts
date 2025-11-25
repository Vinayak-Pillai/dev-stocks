import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(paramsUserName: string, paramsPassword: string) {
    const userData = await this.usersService.findOne(paramsUserName, true);

    if (!userData || !userData.length) {
      throw new UnauthorizedException(
        `No user found with username: ${paramsUserName}`,
      );
    }

    if (!bcrypt.compareSync(paramsPassword, String(userData[0].password))) {
      throw new UnauthorizedException(`Password doesnt match!`);
    }
    const { username, role_id, user_id } = userData[0];
    const jwtSignPayload = {
      username,
      role_id,
      user_id,
    };

    return {
      accessToken: await this.jwtService.signAsync(jwtSignPayload),
      userData: userData[0],
    };
  }
}
