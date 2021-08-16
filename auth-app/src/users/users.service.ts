import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'shin',
            password: 'passer123',
        },
        {
            userId: 2,
            username: 'musashi',
            password: 'passer123',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
