import { Body, Controller, Delete, NotFoundException ,Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        return this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){
        const intId = Number.parseInt(id);
        const user = await this.userService.findOne(intId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    @Get()
    @UseInterceptors()
    async findAllUsers(@Query('email') email: string) {
        return await this.userService.find(email);
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string){
        const intId = Number.parseInt(id);
        return await this.userService.remove(intId);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(Number.parseInt(id), body); 
    }
}
