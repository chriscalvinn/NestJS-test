import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userModule } from 'src/users/user.module';

@Module({
  imports: [userModule],
  providers: [AuthService]
})
export class AuthModule {}
