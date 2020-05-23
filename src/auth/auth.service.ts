import { Injectable } from '@nestjs/common';
import { userService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: userService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUname(username);
    if (user) {
      
    }
    return null;
  }
}
