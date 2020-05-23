import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategies';

@Module({
  imports: [userModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
