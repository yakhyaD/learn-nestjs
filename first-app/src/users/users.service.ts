import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    findAll(): Promise<User[]>{
       return this.usersRepository.find()
    }

    async findOne(id: string): Promise<User>{
        try{
            return await this.usersRepository.findOne(id)

        }catch(error){
           throw error
        }
    }

    async remove(id: string): Promise<void>{
        await this.usersRepository.delete(id)
    }
    async createUser(body: CreateUserDto): Promise<User>{
        const newUser = new User();
        newUser.firstName = body.firstName
        newUser.lastName = body.lastName
        newUser.email = body.email
        newUser.password = body.password

        return await this.usersRepository.save(newUser)
    }
}
