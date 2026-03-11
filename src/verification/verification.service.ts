import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { generateOtp } from 'src/utils/random';
import { SendOtpDto } from './dto/verification.dt';
import { SmsService } from 'src/services/sms.service';

@Injectable()
export class VerificationService {
    constructor(
        private redisService: RedisService,
        private smsService : SmsService
    ) { }

    private getMessage(otp: string) {
        return `Fixoo platformasidan ro'yxatdan o'tish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
    }


    async sendOtp(payload: SendOtpDto) {
        const { phone } = payload;
        let key = "reg_" + phone
        const session = await this.redisService.get(key);
        if (session) {
            throw new HttpException(
                'Code already sent to user',
                HttpStatus.BAD_REQUEST,
            );
        }

        const otp = generateOtp();
        await this.redisService.set(key, +otp);
        await this.smsService.sendSMS(this.getMessage(otp), phone);
        return { message: 'Confirmation code sent' };
    }
}
