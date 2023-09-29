import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // temp secret key
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class AuthModule {}
