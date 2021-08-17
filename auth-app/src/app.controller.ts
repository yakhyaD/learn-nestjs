import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { AuthService  } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/enums/role.enum';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  //@Roles(Role.Admin)
  @Get('/profile')
  async getProfile(@Request() req){
    return req.user;
  }
  @Post('auth/signup')
  async signup(@Request() req){
    return this.authService.signup(req.body);
  }
  @Post('createSomething')
  async something(@Request() req){
    return req.body;
  }

}
