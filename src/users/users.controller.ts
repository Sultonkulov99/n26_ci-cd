import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Get()
    getOtp(
        @Body() key: any
    ){
        return this.userService.getOtp(key)
    }

    @Post()
    createUser(
        @Body() payload : any
    ){
        return this.userService.createUser(payload)
    }

    @Delete()
    deleteOtp(
        @Body() key: any
    ){
        return this.userService.deleteOtp(key)
    }
}
