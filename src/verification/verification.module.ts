import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from 'src/redis/redis.service';
import { SmsService } from 'src/services/sms.service';

@Module({
  imports:[
    RedisModule
  ],
  controllers: [VerificationController],
  providers: [VerificationService,RedisService,SmsService]
})
export class VerificationModule {}
