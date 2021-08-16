import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    addUser(@Body() body: CreateUserDto): Promise<User>{
        return this.usersService.createUser(body)
    }

    @Get()
    getUsers(): Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get(':id')
    getUser(@Param('id') id: string): Promise<User>{
        return this.usersService.findOne(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<void>{
        return this.usersService.remove(id)
    }

}
