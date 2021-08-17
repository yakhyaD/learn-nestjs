import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'shin',
            password: 'passer123',
            roles: [Role.User, Role.Admin]
        },
        {
            userId: 2,
            username: 'musashi',
            password: 'passer123',
            roles: [Role.User]
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
    async create(user: CreateUserDto): Promise<User | undefined> {
        const newUser = new User();
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.roles = [Role.User, Role.Admin];
        this.users.push(newUser);
        return newUser;
    }
}
