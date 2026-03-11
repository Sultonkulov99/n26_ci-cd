import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UsersModule } from './users/users.module';
import { VerificationModule } from './verification/verification.module';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    RedisModule, 
    UsersModule, 
    VerificationModule,
    PrismaModule
  ],
})
export class AppModule {}
