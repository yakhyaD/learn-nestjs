import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UniqueUser } from "./guards/unique-user.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService  ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(UniqueUser)
    @Post('signup')
    async register(@Body() user: CreateUserDto) {
        return await this.authService.signup(user);
    }
}
