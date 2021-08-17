import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
   ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const  { password, ...rest} = user
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(body: CreateUserDto) {

    const user = await this.usersService.findOne(body.username)
    if (user) {
      throw new Error("User already exist");
    }
    const newUser = await this.usersService.create(body);
    return {
      access_token: this.jwtService.sign({ username: newUser.username, sub: newUser.userId }),
    };

  }
}
