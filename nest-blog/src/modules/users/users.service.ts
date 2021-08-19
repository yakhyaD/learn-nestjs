import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    create(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email: email});
    }
}
