import { Injectable } from '@nestjs/common';
import { userService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: userService,
        private jwtService: JwtService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUname(username);
    if (user) {
        const matchUname = await bcrypt.compare(username, user.username);
        const matchPass = await bcrypt.compare((username+pass), user.userdata);
        if (matchUname&&matchPass){
            return user;
        }
    }
    return null;
  }

  async login(user: any){
      const payload = { username: user.username, sub : user.id};
      return {
          access_token: this.jwtService.sign(payload),
      };
  }
}
