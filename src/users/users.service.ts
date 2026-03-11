import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {
    constructor(
        private redisService: RedisService,
        private prisma : PrismaService
    ) { }

    async getAllUsers(){
        const users = await this.prisma.user.findMany()

        return {
            success : true,
            data : users
        }
    }

    async getOtp(key: any) {
        const session = await this.redisService.get(key.email)

        return {
            success: true,
            data: session
        }
    }

    async createUser(payload: any) {
        let otpCode = Math.floor(Math.random() * 99999)
        await this.redisService.set(payload.phone, otpCode)

        await this.prisma.user.create({
            data:payload
        })

        return {
            success: true,
            message: "Otp code sent"
        }
    }

    async deleteOtp(key : any){
        await this.redisService.del(key.email)

        return {
            success : true,
            message : "Otp deleted"
        }
    }
}
